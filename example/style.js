import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

let styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#77D7CB'
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginTop: 18,
    marginBottom: 10,
    color: '#fff'
  },
  demoValue: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#fff'
  },
  button: {
    width: 200,
    height: 30,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#f79e80',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ba3407',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default styles;
