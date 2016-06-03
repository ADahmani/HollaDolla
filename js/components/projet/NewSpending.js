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

import CreateSpendingMutation from '../../mutations/projet/CreateSpendingMutation';

var windowSize = Dimensions.get('window');
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

export default class NewProjetView extends Component {

  constructor(props) {
    super(props);
    console.log('NEW', props);
    this.state = {
      name: '',
      city: '',
      participants: []
    }
  }

  _ajouter(){
    var viewer = this.props.viewer;
    var amount = this.state.amount;
    var from = 'pas important'; // se fait dans le backend
    var projet = this.props.project;
    var name = this.state.name;
    var to = this.state.participants;
    to = _.map(to, (participant) => {
      return participant.id;
    })
    Relay.Store.commitUpdate(
      new CreateSpendingMutation({
        projet,
        to,
        amount,
      }),
      {
        onSuccess: ({CreateSpending}) => {
          var Spendings = CreateSpending.projet;

          Spendings = _.pickBy(Spendings, function (propertyName) {
              console.log('propertyName', propertyName);
              return (typeof propertyName === "object")
          });

          console.log('Spendings', Spendings);
          console.log('CreateSpending', CreateSpending);
          CreateSpending.projet.spendings = Spendings;
          var newdata = CreateSpending.projet;
          console.log('newdata', newdata);
          this.props.app.goToPrev();
        },
        onFailure: (err) => {
          var error = err.getError() || new Error('Mutation failed.');
          console.error(error);
          this.setState({state: 'fucked'});
        }
      }
    );
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
    var friends = me.friends || [];
    var projet = this.props.project || {};;
    var type = projet.type;
    var projetName = projet.name;
    return (
        <View style={styles.container}>
            <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} />
            <View style={styles.typebox}>
              <Image
               source={types[projet.type].image}
               style={styles.typebox}>
                <View style={[styles.backdropText, styles.typebox]}>
                  <Text style={[styles.headline, styles.typebox]} >{'Ajout de dépense à ' +projetName.toUpperCase()}</Text>
                </View>
               </Image>
          </View>
            <View style={styles.inputs}>
                <View style={[styles.inputContainer, {flex: 2}]}>
                  <Text style={{color: '#fff'}} >Combien T'as payé?</Text>
                    <TextInput
                      keyboardType='numbers-and-punctuation'
                      placeholder='0'
                      placeholderTextColor='#FFF'
                      style={{color: '#fff', textAlign: 'center', fontSize: 25}}
                      onChangeText={(amount) => this.setState({amount})}
                      value={this.state.amount}
                    />
                </View>
                <View style={[styles.inputContainer, {flex: 4}]}>
                <Text style={{color: '#fff'}} >Pour Qui?</Text>
                    <View style={styles.participantList}>
                      <Select
                        dynamique={true}
                        width={150}
                        ref='SELECT1'
                        onSelect={this._canada.bind(this)}
                        styleText={{color: '#fff'}}
                        optionListRef={this._getOptionList.bind(this)}
                        defaultValue='+'>
                        {_.map(friends, friend => {
                          friend = friend.split(';');
                          return <Option value = {{ami : friend}}>{friend[1]}</Option>
                        } )}
                      </Select>
                    </View>
                    <View style={{flex: 1, flexDirection:'row'}}>

                    {_.map(this.state.participants, participant => {
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
                            {participant.name}
                          </Text>
                        </View>
                      )
                    })}
                    </View>
                </View>
            </View>
            <TouchableOpacity
              onPress={this._ajouter.bind(this)}
            >
              <View style={styles.signin}>
                  <Text style={styles.whiteFont}>Ajouter</Text>
              </View>
            </TouchableOpacity>
            <OptionList ref='OPTIONLIST'/>
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
    color: 'white',
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
