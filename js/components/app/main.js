import Relay from 'react-relay';
import React, { Component } from 'react';
import ViewerRoute from '../../routes/ViewerRoute';
import CreateSpendingMutation from '../../mutations/projet/CreateSpendingMutation';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar from '../NavBar';
import ProjectsListing from '../ProjectsListing';
import HomeFooter from '../HomeFooter';
var PAGE_SIZE = 4;

class HollaDolla extends Component {
  render() {
    console.log('props', this.props);
    var viewer = this.props.viewer || {};
    var me = viewer.me || {};
    var projectsEdges = me.projets && me.projets.edges;
    return (
      <View style={styles.main} >
        <NavBar {...this.props} />
        <ProjectsListing {...this.props} edges={projectsEdges} />
        <HomeFooter {...this.props} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#282C34',
  }
});


export default Relay.createContainer(HollaDolla, {
  initialVariables: {
    first: PAGE_SIZE
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        me {
          _id
          email
          first_name
          friends
          projets(first: $first) {
            edges{
              node {
                ${CreateSpendingMutation.getFragment('projet')}
                _id
                id
                name
                type
                city
                totalSpendings
                participants {
                  id
                  _id
                  first_name
                }
                spendings(first: 100) {
                  edges {
                    node {
                      _id
                      projet
                      from {
                        _id
                        first_name
                      }
                      to {
                        _id
                        first_name
                      }
                      amount
                    }
                  }
                }
              }
            }
            totalCount
            rangeBegin
            rangeEnd
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    `
  }
});

// export default class MainScreenWrapper extends React.Component {
//
//   render() {
//     console.log('fucing props', this.props);
//     return (
//       <Relay.Renderer
//         Container={MainScreenRelay}
//         queryConfig={new ViewerRoute()}
//         forceFetch={true}
//         environment={Relay.Store}
//       />
//     );
//   }
// }
