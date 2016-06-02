import Relay from 'react-relay';
import React, { Component } from 'react';

import {
  View,
  AppRegistry
} from 'react-native';

import {appRelay} from 'HollaDollaApp/js/components/app/App';
import ViewerRoute from 'HollaDollaApp/js/routes/ViewerRoute';

Relay.injectNetworkLayer(
  //Achraf's house
  new Relay.DefaultNetworkLayer('http://192.168.1.10:3333/graphql'),{
    credentials: 'include'
  }

  //seb's house
  // new Relay.DefaultNetworkLayer('http://192.168.0.16:3333/graphql'),{
  //   credentials: 'include'
  // }

  //seb's Iphone
  // new Relay.DefaultNetworkLayer('http://172.20.10.3:3333/graphql'), {
  //   credentials: 'include'
  // }

  // My Android
  // new Relay.DefaultNetworkLayer('http://192.168.43.119:3333/graphql'), {
  //   credentials: 'include'
  // }

  // new Relay.DefaultNetworkLayer('http://192.168.70.76:3333/graphql')
  // new Relay.DefaultNetworkLayer('http://172.20.10.3:3333/graphql')
  // new Relay.DefaultNetworkLayer('http://192.168.0.23:3333/graphql')
  // new Relay.DefaultNetworkLayer('http://192.168.43.119:3333/graphql')
);

class HollaDolla extends Component {

  render() {
    var viewerRoute = new ViewerRoute();

    return (
        <Relay.RootContainer
           Component={appRelay(this.props)}
           route={viewerRoute}
        />
    );
  }
}

AppRegistry.registerComponent('HollaDollaApp', () => HollaDolla);
