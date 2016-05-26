import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native';
var {width, height} = Dimensions.get('window');

var list = [
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')},
  {name: 'vacances', image: require('../../imgs/projet-types/vacances.jpg')}
];

export default class ProjetTypeView extends Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds: list,
      dataSource: ds,
      currentScreenWidth: width,
      currentScreenHeight: height
    }
  }

  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
    })
  }

  calculatedSize() {
   var size = this.state.currentScreenWidth / 2
   return {width: size, height: size}
  }

  renderData(data, sectionID, rowID, highlightRow){
    return (
      <View style={[styles.box, this.calculatedSize()]}>
          <Image
           source={data.image}
           style={[styles.boxImage, this.calculatedSize()]}>
            <View style={[styles.backdropText, this.calculatedSize()]}>
              <Text style={[styles.headline, this.calculatedSize()]} >{data.name}</Text>
            </View>
           </Image>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <ListView
              contentContainerStyle={styles.list}
              dataSource={this.state.dataSource}
              renderRow={this.renderData.bind(this)} />
      </View>
    );
  }

}


var styles = StyleSheet.create({
     container: {
         flex: 1,
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
    },
    boxImage: {
    },
    backdropText: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
   },
   headline: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
  }
});
