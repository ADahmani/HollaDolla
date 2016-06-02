import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

export default class NavBar extends Component {

  _goToOptions() {
    this.props.app.navigate('ADDFRIEND_SCREEN');
  }

  render() {
    return (
      <View>
        <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Projects</Text>
            <TouchableHighlight onPress={this._goToOptions.bind(this)}>
            <Image
              style={styles.gearIcon}
              source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/30033-200.png'}}
            />
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar:{
      backgroundColor:'#FF3366',
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row'
  },
  toolbarButton:{
      width: 50,
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle: {
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      flex:1
  },
  gearIcon: {
    marginRight: 20,
    width: 20,
    height: 20
  },
});
