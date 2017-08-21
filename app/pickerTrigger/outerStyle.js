import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

let styles = StyleSheet.create({

  container: {

  },
  outerInput: {
    borderColor:'#d8d8d8',
    borderWidth: 1,
    marginLeft:20,
    marginRight:20,
    marginBottom:5,
    marginTop:5,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 3
  },
  textInput:{
    flex: 1,
    height: 40,
    justifyContent: 'center'
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    paddingLeft: 10
  },
  vectorIcon: {
    marginRight: 10
  },
  icon: {
    width:30,
    height:30
  }
});


export default styles;
