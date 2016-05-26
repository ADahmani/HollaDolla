import Relay from 'react-relay';
import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';
import ProjectItem from './ProjectItem';

var ScrollableTabView = require('react-native-scrollable-tab-view');

class HelloMessage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return <View></View>;
  }
}

export default class ProjectsListing extends Component {
  render() {
    var projects = this.props.edges;
    var {height, width} = Dimensions.get('window');
    console.log(projects);


    return (

      <ScrollableTabView renderTabBar={() => <HelloMessage />}>


      {_.map(projects, (p) => <ProjectItem app={this.props.app} navigator={this.props.navigator} key={p.id} project={p.node} />)}

      </ScrollableTabView>
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



});
