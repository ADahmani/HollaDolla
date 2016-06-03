import Relay from 'react-relay';
import React, { Component } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Option,
  OptionList,
  Select
} from '../core/selectme';
var {width, height} = Dimensions.get('window');


var types = {
  vacances : {name: 'Vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  weekend : {name: 'Weekend', image: require('../../imgs/projet-types/weekend.jpg')},
  soiree : {name: 'Soirée', image: require('../../imgs/projet-types/soiree.png')},
  restaurant : {name: 'Restaurant', image: require('../../imgs/projet-types/restaurant.png')},
  colocation : {name: 'Colocation', image: require('../../imgs/projet-types/colocation.png')},
  cadeau : {name: 'Cadeau', image: require('../../imgs/projet-types/cadeau.png')},
  evg : {name: 'EVG', image: require('../../imgs/projet-types/evg.png')},
  divers : {name: 'Divers', image: require('../../imgs/projet-types/divers.png')},
};

export default class ProjetOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      participants: []
    }
  }

  _ajouter(project) {
    this.props.app.navigate('NEW_SPENDING', {project})
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _canada(result) {
    let ami = result.ami;
    let id = ami[0];
    let name = ami[1] || '';
    name = name.substring(0,2).toUpperCase();
    this.setState({
      participants: this.state.participants.concat([{id, name}])
    })
  }

  render() {
    var viewer = this.props.viewer || {};
    var me = viewer.me || {};
    var projet = this.props.projet || {};
    console.log(projet);
    var friends = me.friends || [];
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View>
              <Image style={[width, {height: 120} ]} source={{uri: `http://maps.google.com/maps/api/staticmap?center=${projet.city}&zoom=15&size=600x600&sensor=false`}}/>
            </View>
            <View style={styles.inputs}>

                <View style={[styles.inputContainer, {flex: 4}]}>
                <Text style={{color: '#fff'}} >Participants</Text>
                    <View style={{flex: 1, flexDirection:'row'}}>

                    {_.map(projet.participants, participant => {
                      console.log('participant', participant);
                      if (!participant) {
                        <View style={styles.circle}>
                          <Text style={styles.initials}>
                            ?
                          </Text>
                        </View>
                      }
                      return (
                        <View style={styles.circle}>
                          <Text style={styles.initials}>
                            {participant.first_name.substring(0,2).toUpperCase()}
                          </Text>
                        </View>
                      )
                    })}
                    </View>
                </View>
            </View>
            <TouchableOpacity
              onPress={this._ajouter.bind(this, projet)}
            >
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Ajouter Depense</Text>
              </View>
            </TouchableOpacity>
            <OptionList ref="OPTIONLIST"/>
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
        width: width,
        height: height
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
    },
    typebox: {
      width: width,
      height: 45,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    backdropText: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
   },
   headline: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
  },
  circle: {
    justifyContent: 'center',
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    marginRight: 15
  },
  initials: {
    color: '#fff',
    textAlign: 'center',
    margin: 5,
  }
})
