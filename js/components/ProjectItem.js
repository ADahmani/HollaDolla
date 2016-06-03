import Relay from 'react-relay';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Ionicons = require('react-native-vector-icons/Ionicons');

var types = {
  vacances : {name: 'Vacances', image: require('../imgs/vacances.png')},
  weekend : {name: 'Weekend', image: require('../imgs/weekend.png')},
  soiree : {name: 'Soirée', image: require('../imgs/soiree.png')},
  restaurant : {name: 'Restaurant', image: require('../imgs/restaurant.png')},
  colocation : {name: 'Colocation', image: require('../imgs/colocation.png')},
  cadeau : {name: 'Cadeau', image: require('../imgs/cadeau.png')},
  evg : {name: 'EVG', image: require('../imgs/evg.png')},
  divers : {name: 'Divers', image: require('../imgs/divers.png')},
};


class HelloMessage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return <View></View>;
  }
}

export default class ProjectItem extends Component {

  goToSummary(project) {
    this.props.app.navigateReplace('PROJET_SUMMARY', {project});
  }

  AddExpense(project) {
    this.props.app.navigate('NEW_SPENDING', {project})
  }

  render() {
    var project = this.props.project;
    var {height, width} = Dimensions.get('window');
    var flightIcon = (<MaterialIcons name='flight' size={50} color='#fff' />)
    var restaurant = (<MaterialIcons name='flight' size={50} color='#fff' />)
    var ajouterDepense = (
      <MaterialIcons.Button
        style={{flex: 1, backgroundColor: '#FF3366'}}
        name='add'
        size={20}
        color='#fff'
        onPress={this.AddExpense.bind(this, project)}
      >
      Ajouter Depense
    </MaterialIcons.Button>)
    var Summary = (
      <MaterialIcons.Button
        style={{flex: 1, backgroundColor: '#FE0040'}}
        name='visibility'
        size={20}
        color='#fff'
        onPress={this.goToSummary.bind(this, project)}
      >
      Vue Globale
    </MaterialIcons.Button>)
    return (
      <View style={styles.projectItem}>
        <Image style={{flex: 1, borderRadius: 20}} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}}>
          <View style={styles.projectImg}>
            <View style={styles.Info}>
              <View style={styles.InfoIcon}>
              <Image
               source={types[project.type].image}
               style={styles.typebox}></Image>
              </View>
              <View style={styles.InfoName}>
                <Text style={styles.text}>{project.name.toUpperCase()}</Text>
              </View>
              <View style={styles.InfoSpendings}>
              <Text style={styles.text}>{project.totalSpendings}€</Text>
              </View>
            </View>
          </View>
          <View style={styles.ProjectButtonsContainer}>
          <View style={styles.ProjectButton1}>
            {ajouterDepense}
          </View>
          <View style={styles.ProjectButton2}>
            {Summary}
          </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectItem: {
    flexDirection: 'column',
    flex: 1,
    margin: 20,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: 'rgba(9, 192, 224,0.5)',
  },
  projectImg: {
    backgroundColor: 'transparent',
    flex: 3
  },
  ProjectButtonsContainer: {
    flexDirection: 'row',
  },
  ProjectButton1: {
    padding: 10,
    flex: 1,
    alignItems: 'center'
  },
  ProjectButton2: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  Info: {
    alignItems: 'center',
    flex: 1,
  },
  InfoIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  InfoName: {
    alignItems: 'center',
    flex: 1
  },
  InfoSpendings: {
    alignItems: 'center',
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 40,
    textShadowOffset: {width: 1, height: 1},
    fontFamily: 'light'
  },
  typebox: {
    width: 100,
    height: 100
  }

});
