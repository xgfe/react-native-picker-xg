import React, { Component,  PropTypes} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import styles from './style';
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
    data: PropTypes.object
  };


  constructor(props, context){
    super(props, context);
    this._setEventBegin = this._setEventBegin.bind(this);
    this._changeLayout = this._changeLayout.bind(this);
    this._cancelChose = this._cancelChose.bind(this);
    this._changeAnimateStatus = this._changeAnimateStatus.bind(this);
    this.state = this._stateFromProps(props);
    this.state.animatedHeight = new Animated.Value(height);
    this.state.flex = new Animated.Value(0);
  }

  _stateFromProps(props){
    let selectIndex = [];
    let selectedValue = [];
    let passData = [];
    if(typeof props.selectIndex==='undefined'){
      for (let temp=0;temp<props.level;temp++){
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

    let animationType = props.animationType||'none';
    let transparent = typeof props.transparent === 'undefined' ? true:props.transparent;
    let visible = typeof props.visible === 'undefined' ? false:props.visible;
    let enable = typeof props.enable === 'undefined' ? true:props.enable;
    let inputValue = props.inputValue || 'please chose';
    let confirmBtnText = props.confirmBtnText || '确定';
    let cancelBtnText = props.cancelBtnText || '取消';
    return {
      visible,
      transparent,
      animationType,
      enable,
      inputValue,
      passData,
      selectIndex,
      selectedValue,
      confirmBtnText,
      cancelBtnText,
    };
  }
  _confirmChose(){
    str = '';
    for(let item of this.state.selectedValue){
      str = str + item + ' ';
    }
    this.state.inputValue = str;
    this._setModalVisible(false,'confirm');
    return str;
  }
  _cancelChose(){
    console.log("nono");
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
    this._setModalVisible(false,'cancel');
    return {saveChoseValue:saveChoseValue,saveData:saveData,saveIndex:saveIndex};

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
      this._setModalVisible(true);
      this.refs.test.blur()
      return {saveChoseValue:saveChoseValue,saveData:saveData,saveIndex:saveIndex};
    }

  }
  _setModalVisible(visible,type) {
    if(visible){
      this.setState({visible: visible});
      Animated.timing(
        this.state.flex,
        {toValue: 1}
      ).start();
    }else{
      Animated.timing(
        this.state.flex,
        {toValue: 0}
      ).start(() => this._changeAnimateStatus(type))
    }
  }
  _changeAnimateStatus(type){
    if (type==='confirm'){
      this.setState({visible:false},()=>{
        this.setState({inputValue: str});
        if(this.props.onResult){
          this.props.onResult(str);
        }
      })
    }
    else if(type=='cancel'){
      this.setState({visible:false});
      this.setState({passData: this.state.passData,selectIndex:this.state.selectIndex,selectedValue: this.state.selectedValue});
    }
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)' ,
    };
    let innerContainerTransparentStyle = {backgroundColor: '#fff'};

    return (
      <View style={styles.container}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.visible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={[styles.modalContainer]}>
            <View style={styles.test}></View>
            <Animated.View style={[styles.innerContainer,{flex:this.state.flex}]}>
              <View style={[styles.nav,this.props.navStyle]}>
                <TouchableOpacity  style={styles.confirm}>
                  <Text className={"confirm"} onPress={() => {this. _confirmChose()}}
                        style={[styles.confirmBtnStyle,this.props.confirmBtnStyle]} >{this.state.confirmBtnText}</Text>
                </TouchableOpacity>
                <Text style={[styles.pickerName,this.props.pickerNameStyle]}>{this.props.pickerName}</Text>
                <TouchableOpacity style={styles.cancel} >
                  <Text
                    className={"cancel"}
                    onPress={() => {this._cancelChose()}}
                    style={[styles.cancelBtnStyle,this.props.cancelBtnStyle]}
                  >{this.state.cancelBtnText}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.pickContainer]} >
                {this.state.passData.map((item,index) =>{
                  return(
                    <CPicker
                      key = {index}
                      className = {"test"+index}
                      style = {{flex:1}}
                      itemStyle = {{flex:1}}
                      selectIndex = {this.state.selectIndex[index]}
                      selectedValue = {this.state.selectedValue[index]}
                      pickerStyle = {{flex:1}}
                      data = {this.state.passData[index]}
                      passData = {this.state.passData}
                      onValueChange={(newValue,newIndex) => {this._changeLayout(newValue,index)}}
                    >
                      { Platform.OS === 'ios' &&((this.state.passData[index]).map((carMake) => (
                        <PickerItem
                          key={carMake}
                          value={carMake}
                          label={carMake}
                        />
                      )))}

                    </CPicker>)})}
              </View>

            </Animated.View>
          </View>
        </Modal>
        <View style={[styles.outerInput,this.props.inputStyle]}>
        <TextInput
          underlineColorAndroid={'transparent'}
          editable = {this.state.enable}
          style = {[styles.textInput,this.props.textStyle]}
          ref = 'test'
          onFocus={() => { this._setEventBegin()}}
          placeholder={this.state.inputValue}
          value={this.state.inputValue}
        /><TouchableOpacity style={styles.iconOuter}onPress={() => { this._setEventBegin()}}>
          <Icon style={styles.container2Icon} name="sort-desc" color="grey" size={20}/>
          </TouchableOpacity>
          </View>
      </View>

    );
  }
}






export default CPickerroll;
