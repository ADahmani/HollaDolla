import {StyleSheet, Platform, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 20; // subtract 20 for header inserted at top

export default StyleSheet.create({
  base: {
    flex: 1,
  },
  inner: {
    flex: 1,
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5
  },
  pushModalContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    width: 200,
    height: 150,
    backgroundColor: '#fff',
  }
});
