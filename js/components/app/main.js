import Relay from 'react-relay';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NavBar from '../NavBar';
import ProjectsListing from '../ProjectsListing';
import HomeFooter from '../HomeFooter';

export default class HollaDolla extends Component {
  render() {
    console.log('props', this.props);
    var viewer = this.props.viewer || {};
    var projectsEdges = viewer.projets && viewer.projets.edges;
    return (
      <View style={styles.main} >
        <NavBar />
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
