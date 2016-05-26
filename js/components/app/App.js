'use babel';
import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Styles from './App.style.js';
import getRoute from '../../ViewsRoutes/Routes';
var PAGE_SIZE = 3;
import {
  View,
  Image,
  Navigator,
} from 'react-native';

export class App extends Component {

  static propTypes = {
    viewer: React.PropTypes.object,
    relay: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      pushModalShow: false,
      pushModalTitle: '',
      pushModalMessage: '',
      pushModalAdditionalData: '',
    };
  }

  showPushModal(body) {
    let title, message, additionalDataString;
    if (body.message) {
      message = body.message;
    }
    if (body.additionalData) {
      const additionalData = JSON.parse(body.additionalData);
      title = additionalData.title;
      additionalDataString = body.additionalData;
    }
    this.setState({
      pushModalShow: true,
      pushModalTitle: title,
      pushModalMessage: message,
      pushModalAdditionalData: additionalDataString,
    });
  }

  goToPrev(navigator) {
    navigator.pop();
  }

  renderScene(route, navigator) {
    var osHeader, pushModalMarkup;
    var RouteComponent = route.Component;

    if (this.state.pushModalShow) {
      pushModalMarkup = (
          <View style={Styles.pushModalContainer}>
            <Text>Title</Text>
            <Text>{this.state.pushModalTitle}</Text>
            <Text>Message</Text>
            <Text>{this.state.pushModalMessage}</Text>
            <Text>Additional Data</Text>
            <Text>{this.state.pushModalAdditionalData}</Text>
          </View>
      );
    }

    return (
        <RouteComponent
          {...route.sendAttrs}
          app={this}
          navigator={navigator}
          route={route}
          relay={this.props.relay}
          viewer={this.props.viewer}
        />
    );
  }

  navigate(route) {
    this.refs.navigator.replace(getRoute(route));
  }

  navigateToTop() {
    this.refs.navigator.popToTop();
  }

  navigateReplace(route) {
    this.refs.navigator.replace(route);
  }

  navigateJumpTo(route) {
    this.refs.navigator.jumpTo(route);
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={getRoute('START_SCREEN')}
        renderScene={this.renderScene.bind(this)}
        viewer={this.props.viewer}
      />
    );
  }
}
export var appRelay = (props) => {
  return Relay.createContainer(App, {
    initialVariables: {
      first: PAGE_SIZE
    },

    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          projets(first: $first) {
            edges{
              node {
                id
                name
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
      `
    }
  });
}
