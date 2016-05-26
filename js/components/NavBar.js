import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class NavBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>Projects</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar:{
      backgroundColor:'#09C0E0',
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row'
  },
  toolbarButton:{
      width: 50,
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      flex:1
  }
});
