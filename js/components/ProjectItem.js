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

class HelloMessage extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return <View></View>;
  }
}

export default class ProjectItem extends Component {

  goToSummary() {
    this.props.app.navigate('PROJET_ITEM')
  }


  render() {
    var project = this.props.project;
    var {height, width} = Dimensions.get('window');
    var flightIcon = (<MaterialIcons name='flight' size={50} color='#fff' />)
    var restaurant = (<MaterialIcons name='flight' size={50} color='#fff' />)
    var ajouterDepense = (
      <MaterialIcons.Button
        style={{flex: 1, backgroundColor: '#5FD89B'}}
        name='add'
        size={20}
        color='#fff'
      >
      Add Expense
    </MaterialIcons.Button>)
    var Summary = (
      <MaterialIcons.Button
        style={{flex: 1, backgroundColor: '#09C0E0'}}
        name='visibility'
        size={20}
        color='#fff'
        onPress={this.goToSummary.bind(this)}
      >
      View Summary
    </MaterialIcons.Button>)

    return (

      <View style={styles.projectItem}>
        <Image style={{flex: 1, borderRadius: 20}} source={{uri: 'https://s-media-cache-ak0.pinimg.com/474x/8e/93/3c/8e933cff4e60d1b8f1dee34894c65d63.jpg'}}>
          <View style={styles.projectImg}>
            <View style={styles.Info}>
              <View style={styles.InfoIcon}>
                  <Text style={styles.text}>{flightIcon}</Text>
              </View>
              <View style={styles.InfoName}>
                <Text style={styles.text}>{project.name.toUpperCase()}</Text>
              </View>
              <View style={styles.InfoSpendings}>
              <Text style={styles.text}>65$</Text>
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

});
