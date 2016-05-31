'use babel';
import React, { Component } from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Styles from './App.style.js';
import getRoute from '../../ViewsRoutes/Routes';
import EmailLoginMutation from '../../mutations/viewer/EmailLoginMutation';
import SignUpMutation from '../../mutations/viewer/SignupMutation';

import MainScreen from './main';
import {
  View,
  Image,
  Navigator,
  BackAndroid
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

  componentDidMount() {
    var self = this;
    BackAndroid.addEventListener('hardwareBackPress', function() {
       self.goToPrev();
       return true;
     });
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

  goToPrev() {
    this.refs.navigator.pop();
  }

  _onLoginComplete() {
    this.refs.navigator.resetTo(
      getRoute('START_SCREEN')
    );
  }

  login(email, password) {
    Relay.Store.commitUpdate(
      new EmailLoginMutation({
        viewer: this.props.viewer,
        email: email,
        password: password
      }),
      {
        onSuccess: (data) => {
          // this.props.relay.forceFetch();
          this._onLoginComplete();
        },
        onFailure: (err) => {
          var error = err.getError() || new Error('Mutation failed.');
          console.error(error);
          this.setState({state: 'fucked'});
        }
      }
    );
  }

  signUp(data) {
    Relay.Store.commitUpdate(
      new SignUpMutation({
        viewer: this.props.viewer,
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password,
      }),
      {
        onSuccess: (data) => {
          // this.props.relay.forceFetch();
          this._onLoginComplete();
        },
        onFailure: (err) => {
          var error = err.getError() || new Error('Mutation failed.');
          console.error(error);
          this.setState({state: 'fucked'});
        }
      }
    );
  }

  renderScene(route, navigator) {
    var osHeader, pushModalMarkup;
    var RouteComponent = route.Component;

    if (this.state.pushModalShow) {
      pushModalMarkup = (
          <View style={Styles.pushModalContainer}>
            <Text>Title</Text>
            <Text>{this.state.pushModalTitle}</Text>
            <Text>Messagse</Text>
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

  navigate(route, attrs) {
    this.refs.navigator.push(getRoute(route, attrs));
  }

  navigateToTop() {
    this.refs.navigator.popToTop();
  }

  navigateReplace(route, attrs) {
    this.refs.navigator.replace(getRoute(route, attrs));
  }

  navigateJumpTo(route, attrs) {
    this.refs.navigator.jumpTo(getRoute(route, attrs));
  }

  render() {
    var initialRoute = this.props.viewer.me ? 'START_SCREEN' : 'LOGIN_SCREEN';
  return (
      <Navigator
        ref='navigator'
        initialRoute={getRoute(initialRoute)}
        renderScene={this.renderScene.bind(this)}
        viewer={this.props.viewer}
      />
    );
  }
}
export var appRelay = (props) => {
  return Relay.createContainer(App, {

    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
          ${EmailLoginMutation.getFragment('viewer')}
          ${SignUpMutation.getFragment('viewer')}
          ${MainScreen.getFragment('viewer')}
          me {
            _id
            email
            first_name
          }
        }
      `
    }
  });
}
