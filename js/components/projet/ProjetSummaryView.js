import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import ViewerRoute from '../../routes/ViewerRoute';
var {width, height} = Dimensions.get('window');
var ScrollableTabView = require('react-native-scrollable-tab-view');
import ProjetOverview from './ProjetOverview';

var types = {
  vacances : {name: 'Vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  weekend : {name: 'Weekend', image: require('../../imgs/projet-types/weekend.jpg')},
  soiree : {name: 'Soirée', image: require('../../imgs/projet-types/soiree.png')},
  restaurant : {name: 'Restaurant', image: require('../../imgs/projet-types/restaurant.png')},
  colocation : {name: 'Colocation', image: require('../../imgs/projet-types/colocation.png')},
  cadeau : {name: 'Cadeau', image: require('../../imgs/projet-types/cadeau.png')},
  evg : {name: 'EVG', image: require('../../imgs/projet-types/evg.png')},
  divers : {name: 'Divers', image: require('../../imgs/projet-types/divers.png')},
};

class SummaryList extends Component {

  render() {
    return (<Text>Booom</Text>);
  }
}

export default class ProjetSummaryView extends Component {

  constructor(props){
    super(props);
    this.state = {
      QuiDoitQuoi: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      Spendings: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      currentScreenWidth: width,
      currentScreenHeight: height
    }
  }


  componentWillMount() {
    var projet = this.props.project || {};
    var participants = projet.participants || {};
    var spendings = projet.spendings || {};
    var depenses = _.map(spendings.edges, edge => edge.node) || {};

    var nbParticipants = participants.length;
    var tab = [];
    var xDepart = 1, x = 0, y = 0;
    var key = "";
    var tabLiaison = {};
    for (y = 0 ; y < nbParticipants - 1 ; y++) {
      for (x = xDepart ; x < nbParticipants ; x++) {
        key = y + "-" + x;
        tab[key] = 0;
      }
      xDepart += 1;
      // On en profite pour crÈer le tableau de liaison entre index de l'algo et id de la BDD
      tabLiaison[participants[y]._id] = y;
    }
    tabLiaison[participants[y]._id] = y;

    var nbDepenses = depenses.length


    // Ensuite, pour chaque dÈpense
    var numeroDepense = 0;
    var indexPersQuiAPaye = -1;
    var indexPersQuiDoit = -1;
    for (numeroDepense ; numeroDepense < nbDepenses ; numeroDepense++){
      var depense = depenses[numeroDepense];
      indexPersQuiAPaye = tabLiaison[depense.from && depense.from._id];
      indexPersQuiDoit = tabLiaison[depense.to && depense.to._id];
      // We always want to create the key this way : minValue-maxValue
      if (indexPersQuiAPaye === indexPersQuiDoit)
      {
        // Same person
      }
      else if (indexPersQuiAPaye < indexPersQuiDoit)
      {
        key = indexPersQuiAPaye + "-" + indexPersQuiDoit;
        tab[key] += parseFloat(depense.amount);
      }
      else
      {
        key = indexPersQuiDoit + "-" + indexPersQuiAPaye;
        tab[key] -= parseFloat(depense.amount);
      }

    }
    // Affichage de toutes les valeurs :
    var nbElements = 0;
for (let key in tab) {

	if (tab[key] == 0) {
		delete tab[key];
	}
	else {
		if (tab[key] < 0) {
			let indexUsers = key.split("-");
			tab[indexUsers[1].concat("-").concat(indexUsers[0])] = -tab[key];
			delete tab[key];
		}
		nbElements++;
	}
}

// Tentative d'optimisation dans un cas particulier
if (nbParticipants == 3 && nbElements > 1) {
	let valeurMaxi = 0;
	let keyValeurMaxi = "";
	for (let key in tab) {
		if (tab[key] > valeurMaxi) {
			valeurMaxi = tab[key];
			keyValeurMaxi = key;
		}
	}

	let indexUsers = keyValeurMaxi.split("-");
	let indexUser1 = indexUsers[0];
	let indexUser2 = indexUsers[1];
	// Vu qu'il y a trois participants, on peut savoir qui est le troisiËme sur la base des deux premiers
	let indexUser3 = (3 - (parseInt(indexUser1) + parseInt(indexUser2))).toString();
	// On vÈrifie si la paire pour essayer de factoriser les dÈpenses existe
	let keyValeurASoustraire = indexUser3.concat("-").concat(indexUser1);
	if (tab[keyValeurASoustraire] != undefined)
	{
		let keyValeurAAugmenter = indexUser3.concat("-").concat(indexUser2);
		// On peut diminuer les dÈpenses par un "procÈdÈ similaire ‡ une relation de Chasles" (c'est imagÈ)
		tab[keyValeurMaxi] -= tab[keyValeurASoustraire];
    if (tab[keyValeurAAugmenter] != undefined) {
      tab[keyValeurAAugmenter] += tab[keyValeurASoustraire];
    }
    else {
      // Peut-être que la clef inverse existe
      let keyInverse = indexUser2.concat("-").concat(indexUser3);
      if (tab[keyInverse] != undefined)
      {
          tab[keyInverse] -= tab[keyValeurASoustraire];
      }
      else {
          tab[keyValeurAAugmenter] = tab[keyValeurASoustraire];
      }
    }
		delete tab[keyValeurASoustraire];
	}
}
  var rows = [];
    for (var key in tab) {
      var indexUsers = key.split("-");
      if (tab[key] > 0) {
        // Ici il faudra juste crÈer les bons div
        rows.push({from: participants[indexUsers[1]].first_name, to: participants[indexUsers[0]].first_name, amount: tab[key]})
      }
      else if(tab[key] < 0) {
        rows.push({from: participants[indexUsers[0]].first_name, to: participants[indexUsers[1]].first_name, amount: (-tab[key])})
      }
    }
    if (!rows) {
      return;
    }
    if (!depenses) {
      return;
    }
    const rowIDs = rows.map((row, index) => index);
    const row2IDs = depenses.map((depense, index) => index);
    this.setState({
      QuiDoitQuoi: this.state.QuiDoitQuoi.cloneWithRows(rows, rowIDs),
      Spendings: this.state.Spendings.cloneWithRows(depenses, row2IDs),
    });
  }

  renderQuiDoitQuoi(row) {
    const spending = row;
    return (
        <View style={styles.row}>
          <View style={styles.thumb}>
            <Text style={styles.circleText}>{`${row.from.substring(0,3).toUpperCase()}`}</Text>
          </View>
          <View style={styles.doitText}>
            <Text style={styles.Text}>
              {`doit à ${row.to}`}
            </Text>
          </View>
          <View style={styles.thumb}>
            <Text style={styles.circleText}>{`${row.amount}`} €</Text>
        </View>
      </View>
    );
  }
  renderSpending(row) {
    const spending = row;
    const isMe = spending.to._id === spending.from._id;
    return (
        <View style={styles.row}>
          <View style={styles.thumb}>
            <Text style={styles.circleText}>
              {`${row.from.first_name.substring(0,3).toUpperCase()}`}
            </Text>
          </View>
          <View style={styles.doitText}>
            <Text style={styles.Text}>
              {`a dépensé ${row.amount}€ pour `}
            </Text>
          </View>
          <View style={styles.thumb}>
            <Text style={styles.circleText}>
              {!isMe &&
                `${row.to.first_name.substring(0,3).toUpperCase()}`}
              {isMe &&
                `lui meme`}
            </Text>
        </View>
      </View>
    );
  }

  render() {
    console.log('kkkk', this.props);
    var projet = this.props.project || {};
    var participants = projet.participants || {};
    var spendings = projet.spendings || {};
    var depenses = _.map(spendings.edges, edge => edge.node) || {};

    return (
      <View style={styles.container}>
      <View style={styles.typebox}>
      {projet.type &&
        <Image
         source={types[projet.type].image}
         style={styles.typebox}>
          <View style={[styles.backdropText, styles.typebox]}>
            <Text style={[styles.headline, styles.typebox]}>{projet.name.toUpperCase()}</Text>
          </View>
         </Image>
      }
      </View>
      <ScrollableTabView>
        <ProjetOverview projet={projet} app={this.props.app} tabLabel='Bilan'/>
        <ListView
          tabLabel='Dépenses'
          dataSource={this.state.Spendings}
          renderRow={this.renderSpending.bind(this)}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={{height:1, backgroundColor: '#D0D0D0'}} />}
        />
        <ListView
          tabLabel='QuiDoitQuoi'
          dataSource={this.state.QuiDoitQuoi}
          renderRow={this.renderQuiDoitQuoi.bind(this)}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={{height:1, backgroundColor: '#D0D0D0'}} />}
        />
      </ScrollableTabView>
      </View>
    );
  }

}


var styles = StyleSheet.create({
   container: {
       flex: 1,
       width: width,
       height: height
    },
    box: {
    },
    boxImage: {
    },
    typebox: {
      width: width,
      height: 45,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    backdropText: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
   },
   headline: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    marginRight: 15,
  },
  doitText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  circleText: {
    color: '#fff',
    fontSize: 15,
  },
  Text: {
    color: '#000',
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#FF3366',
    height: 60,
    flex: 0.0625
  },
  footerButton: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FF3366'
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'light'
  },
});


// const ProjetSummaryRelay = (projectId) => Relay.createContainer(ProjetSummaryView, {
//
//   initialVariables: {
//     projectId
//   },
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on Viewer {
//         projet(id: $projectId){
//           name
//           type
//           city
//           totalSpendings
//           participants {
//             id
//             _id
//             first_name
//           }
//           spendings(first: 100) {
//             edges {
//               node {
//                 _id
//                 projet
//                 from {
//                   _id
//                   first_name
//                 }
//                 to {
//                   _id
//                   first_name
//                 }
//                 amount
//               }
//             }
//           }
//         }
//       }
//     `,
//   },
// });
//
// export default class SessionSummaryScreenWrapper extends React.Component {
//
//   static propTypes = {
//     projectId: React.PropTypes.string
//   };
//
//   render() {
//     return (
//       <Relay.Renderer
//         Container={ProjetSummaryRelay(this.props.projectId)}
//         queryConfig={new ViewerRoute({
//           projectId: this.props.projectId
//         })}
//         /* renderFailure={(err) => console.log(err)} */
//         environment={Relay.Store}
//       />
//     );
//   }
// }
