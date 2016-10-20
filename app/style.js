import {
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
let ratio = PixelRatio.get();
let styles = StyleSheet.create({

  container: {

  },
  nav: {
    flexDirection: 'row',
    flex:2,
    alignItems: 'center',
    paddingLeft:20,
    paddingRight:20,
  },
  confirm: {
    flex:1,
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
  innerContainer: {
    position:'absolute',
    height:220,
    width:width,
    backgroundColor:'white',
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
  },
  icon: {
    width:30,
    height:30
  }
});

let rollStyles = StyleSheet.create({

  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0)'
  },
  up: {
    height: 90,
    overflow: 'hidden',
    alignSelf:'stretch'
  },
  upView: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  upText: {
    paddingTop: 0,
    height: 30,
    fontSize: 20,
    color: '#000',
    opacity: .5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  middle: {
    alignSelf:'stretch',
    borderColor: '#aaa',
    borderTopWidth: 1 / ratio,
    borderBottomWidth: 1 / ratio
  },
  middleView: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  middleText: {
    height: 36,
    textAlign: 'center',
    color: '#000',
    paddingTop: 3
  },
  down: {
    height: 90,
    overflow: 'hidden',
    alignSelf:'stretch'
  },
  downView: {
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  downText: {
    paddingTop: 0,
    height: 30,
    fontSize: 16,
    color: '#000',
    opacity: 0.5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }
});

export {styles as styles, rollStyles as rollStyles};
