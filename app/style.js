import {
  StyleSheet,
} from 'react-native';

let styles = StyleSheet.create({

  container: {

  },
  nav: {
    flexDirection: 'row',
    flex:2,
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: 'yellow',
  },
  confirm: {
    flex:1,
    backgroundColor:'lightblue',
  },
  confirmBtnStyle:{
    textAlign:'left',
    marginLeft:10
  },
  pickerName:{
    flex:1,
    textAlign:'center',
  },
  cancel: {
    flex:1,
  },
  cancelBtnStyle: {
    textAlign:'right',
    marginRight:10
  },
  pickContainer:{
    flex:9,
    flexDirection:'row',
  },
  modalContainer: {
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  test:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0)',
  },
  innerContainer: {
    flex:1,
    backgroundColor:'pink',
  },
  outerInput: {
    borderColor:'grey',
    borderWidth: 1,
    marginLeft:20,
    marginRight:20,
    marginBottom:5,
    marginTop:5,
    flexDirection:'row',
    alignItems: 'center',
    height:40,
  },
  textInput:{
    flex:9,
    paddingLeft:10,
    fontSize:14,
  },
  iconOuter:{
    flex:1,
    alignItems: 'center',
  },
  container2Icon: {
    flex:1,
    marginTop:-10,
  }
});

export default styles;
