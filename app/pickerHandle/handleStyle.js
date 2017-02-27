import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

let styles = StyleSheet.create({

  nav: {
    flexDirection: 'row',
    flex:2,
    alignItems: 'stretch'
  },
  confirm: {
    flex:1,
    justifyContent: 'center'
  },
  confirmBtnStyle:{
    textAlign:'left',
    paddingLeft:20,
    paddingRight:20,
    fontSize: 18
  },
  pickerName:{
    flex:1,
    textAlign:'center',
    fontSize: 18
  },
  cancel: {
    flex:1,
    justifyContent: 'center'
  },
  cancelBtnStyle: {
    textAlign:'right',
    paddingLeft:20,
    paddingRight:20,
    fontSize: 18
  }
});


export default styles;
