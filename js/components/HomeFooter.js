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
    this.props.app.navigateReplace('PROJET_ITEM')
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
    backgroundColor: '#FF3366',
    height: 60,
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
