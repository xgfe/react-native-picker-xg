import React, { Component,  PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  PanResponder,
  TouchableOpacity,
  TextInput,
  Animated,
  PickerIOS,
  Platform,
  Modal,
} from 'react-native';


import CPickroll from './roll2';
let CPicker = Platform.OS === 'ios' ? PickerIOS : CPickroll;
let PickerItem = CPicker.Item;
let height = Dimensions.get('window').height;
let top = height - 250;
let str = '';
let saveChoseValue = [];
let saveData = [];
let saveIndex = [];
class CPickerroll extends Component {

  static propTypes = {
    data: PropTypes.object,
  };


  constructor(props, context){
    super(props, context);
    this._setEventBegin = this._setEventBegin.bind(this);
    this._changeLayout = this._changeLayout.bind(this);
    this._cancelChose = this._cancelChose.bind(this);
    this.state = this._stateFromProps(this.props);
  }

  _stateFromProps(props){
    let selectIndex = [];
    let selectedValue = [];
    let passData = [];
    if(typeof props.selectIndex==='undefined'){
      for(let temp=0;temp<props.level;temp++){
        selectIndex.push(0);
      }
    }else{
      selectIndex = props.selectIndex;
    }

    let tempData = props.data;
    let finalData = props.data;
   for(let temp=0;temp<props.level;temp++){
     if(temp!==props.level-1){
      let data = Object.keys(tempData);
      let key = data[selectIndex[temp]];
      selectedValue.push(key);
      passData.push(data);
      tempData = tempData[key];
       finalData = finalData[key];
     }
     else{
       passData.push(finalData);
       selectedValue.push(finalData[selectIndex[temp]]);
     }
    }

    let selfStyle = props.selfStyle;
    let inputStyle = props.inputStyle;
    let animationType = props.animationType||'none';
    let transparent = typeof props.transparent==='undefined'?true:props.transparent;
    let visible = typeof props.visible==='undefined'?false:props.visible;
    let enable = typeof props.enable==='undefined'?true:props.enable;
    let inputValue = props.inputValue||'please chose';
    return {
      selfStyle,
      visible,
      transparent,
      animationType,
      enable,
      inputValue,
      inputStyle,
      passData,
      selectIndex,
      selectedValue,
    };
  }
  _confirmChose(){
    for(let item of this.state.selectedValue){
      str = str + item + ' ';
    }
    this.setState({inputValue:str,visible: false});
  }
  _cancelChose(){
    this.state.selectIndex.length=0;
    this.state.passData.length = 0;
    this.state.selectedValue.length = 0;
    for(let item of saveChoseValue){
      this.state.selectedValue.push(item);
    }
    for(let item1 of saveData){
      this.state.passData.push(item1);
    }
    for(let item2 of saveIndex){
      this.state.selectIndex.push(item2);
    }
    this.setState({passData: this.state.passData,selectIndex:this.state.selectIndex,selectedValue: this.state.selectedValue, visible:false});
  }
  _setEventBegin(){
    if(this.state.enable){
      saveChoseValue.length = 0;
      saveData.length = 0;
      saveIndex.length =0;
      for(let item of this.state.selectedValue){
        saveChoseValue.push(item);
      }
      for(let item1 of this.state.passData){
        saveData.push(item1);
      }
      for(let item2 of this.state.selectIndex){
        saveIndex.push(item2);
      }
      this.setState({passData:this.state.passData,selectIndex:this.state.selectIndex,selectedValue: this.state.selectedValue});
      this._setModalVisible(true)
      this.refs.test.blur()
      str = '';
    }

  }
  _setModalVisible(visible) {
    this.setState({visible: visible});
  }

  _changeLayout(value,index){
    this.state.selectedValue.splice(index,1,value);
    this.state.passData.length = index+1;
    this.state.selectIndex.length = index;
    this.state.selectedValue.length = index;
    this.state.selectedValue.push(value);
    this.state.selectIndex.push(this.state.passData[this.state.passData.length-1].indexOf(value));
    if(this.props.level-index>1){
      let data = this.props.data;
      for(let temp=0; temp<=index;temp++){
        data = data[this.state.selectedValue[temp]];
      }
    for(let item=0;item<this.props.level-index-2;item++){
        let dataKeys = Object.keys(data);
        this.state.passData.push(dataKeys);
        this.state.selectIndex.push(0);
        this.state.selectedValue.push(dataKeys[0]);
        data = data[dataKeys[0]];
    }
      this.state.passData.push(data);
      this.state.selectIndex.push(0);
      this.state.selectedValue.push(data[0]);
    }
    this.setState({passData:this.state.passData,selectedValue:this.state.selectedValue,selectIndex:this.state.selectIndex});
  }
  render(){

    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    return (
      <View style={styles.container}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.visible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={[testStyle.container, modalBackgroundStyle]}>
            <View style={[testStyle.innerContainer, innerContainerTransparentStyle]}>
              <View style={styles.nav}>
                <TouchableOpacity  style={styles.confirm}>
                  <Text onPress={() => {this. _confirmChose()
                    }}
                        style={{textAlign:'left',marginLeft:10}} >Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} >
                  <Text
                    style={{textAlign:'right',marginRight:10}}
                    onPress={() => {this._cancelChose()
                    }}
                  >Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.pickContainer, this.state.selfStyle]} >
                {this.state.passData.map((item,index) =>{
                  return(
                    <CPicker
                      key = {index}
                      style = {{flex:1}}
                      selectIndex = {this.state.selectIndex[index]}
                      selectedValue = {this.state.selectedValue[index]}
                      pickerStyle = {{flex:1}}
                      data = {this.state.passData[index]}
                      passData = {this.state.passData}
                      onValueChange={(newValue,newIndex) => {
                                            this._changeLayout(newValue,index)}}
                    >
                      {(this.state.passData[index]).map((carMake) => (
                        <PickerItem
                          key={carMake}
                          value={carMake}
                          label={carMake}
                        />
                      ))}

                    </CPicker>)})}
              </View>

            </View>
          </View>
        </Modal>
        <TextInput
          editable = {this.state.enable}
          style = {this.props.inputStyle}
          ref = 'test'
          multiline={ true }
          onFocus={() => { this._setEventBegin()
                   }}
          placeholder={this.state.inputValue}
          value={this.state.inputValue}
        />
      </View>

    );
  }
}



let styles = StyleSheet.create({

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    flex: 1,
    marginTop:10,
    flexDirection: 'row',
    height: 28,
    alignSelf: 'stretch',
    backgroundColor:'white',
  },
  confirm: {
    flex:1,
  },
  cancel: {
    flex:1,

  },
  pickContainer:{
    flex:1,
    justifyContent: 'center',
    alignSelf:'stretch',
    flexDirection:'row',
  },

});

const testStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    flex:1,
    marginTop:top,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },

})




export default CPickerroll;
