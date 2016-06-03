import Relay from 'react-relay';
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import EmailLoginMutation from '../../mutations/viewer/EmailLoginMutation';


var windowSize = Dimensions.get('window');

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  login(){
    var email = this.state.email;
    var password = this.state.password;
    this.props.app.login(email, password);
  }

  _goToSignup() {
    this.props.app.navigate('SIGNUP_SCREEN')
  }


  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://i.imgur.com/da4G0Io.png'}} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput
                        placeholder="Login"
                        placeholderTextColor="#FFF"
                        style={{color: '#fff'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        password={true}
                        style={{color: '#fff'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        placeholder="Mot de Passe"
                        placeholderTextColor="#FFF"
                    />
                </View>
            </View>
            <TouchableOpacity
              onPress={this.login.bind(this)}
            >
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Connnexion</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.signup}>
                <Text style={styles.greyFont}>
                  Pas encore inscrit ?
                    <Text
                      onPress={this._goToSignup.bind(this)}
                      style={styles.whiteFont}> Créer un Compte !</Text>
                </Text>
            </View>
        </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .3,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        flex:1,
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})
