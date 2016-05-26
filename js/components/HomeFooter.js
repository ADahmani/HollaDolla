import React, { Component } from 'react';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class HomeFooter extends Component {

  constructor(props) {
    super(props);
  }

  goToSummary() {
    this.props.app.navigate('PROJET_ITEM')
  }

  render() {
    console.log(this.props);
    return (
      <TouchableOpacity
        onPress={this.goToSummary.bind(this)}
      >
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Text style={styles.footerText}>{'Nouveau projet'.toUpperCase()}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: '#1FB0E6',
    height: 60,
  },
  footerButton: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1FB0E6'
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'light'
  },
});
