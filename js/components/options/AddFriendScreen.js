import Relay from 'react-relay';
import React, { Component } from 'react';
import AddFriendMutation from '../../mutations/user/AddFriendMutation';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

// import EmailLoginMutation from '../../mutations/viewer/EmailLoginMutation';


var windowSize = Dimensions.get('window');

export default class AddFriendScreen extends Component {

  constructor(props) {
    super(props);
    console.log('Addfriend', this.props);
    this.state = {
      email: ''
    }
  }

  _addFriend(){
    var email = this.state.email;
    Relay.Store.commitUpdate(
      new AddFriendMutation({
        user: this.props.viewer.me,
        email: email,
      }),
      {
        onSuccess: (data) => {
          this.props.relay.forceFetch();
        },
        onFailure: (err) => {
          var error = err.getError() || new Error('Mutation failed.');
          console.error(error);
          this.setState({state: 'fucked'});
        }
      }
    );
  }


  render() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.inputs}>
              <View style={styles.inputContainer}>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor="#FFF"
                    style={{color: '#fff'}}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                  />
              </View>
            </View>
            <TouchableOpacity
              onPress={this._addFriend.bind(this)}
            >
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Add friend</Text>
              </View>
            </TouchableOpacity>
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
