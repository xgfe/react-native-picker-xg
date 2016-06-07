import React, { Component,PropTypes } from 'react';
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
    Platform,
    PickerIOS,
    Modal
} from 'react-native';


import Pickroll from './roll';
import styles from './style';

let PickRoll = Platform.OS === 'ios' ? PickerIOS : Pickroll;
let PickerItem = PickRoll.Item;

let height = Dimensions.get('window').height;
let top = height - 250;
let valueCount = [];
let indexCount = [];
let str = '';

class TMPicker extends Component {
  static propTypes = {
    data: PropTypes.array,
    visible: PropTypes.bool,
    transparent: PropTypes.bool,
    animationType: PropTypes.string,
    enable: PropTypes.bool,
    inputValue: PropTypes.string,
  };

  constructor(props, context){
    super(props, context);
    this._changeAnimateStatus = this._changeAnimateStatus.bind(this);
    this.state = this._stateFromProps(props);
    this.state.animatedHeight = new Animated.Value(height);
  }

  _stateFromProps(props){
    let selectIndex = [];
    let selectedValue = [];
    if(typeof props.selectIndex==='undefined'){
      for(let item of props.data){
        selectIndex.push(0);
        selectedValue.push(Object.keys(item)[0]);
      }
    }else{
      selectIndex = props.selectIndex;
      props.data.map((item,index) =>{
        selectedValue.push(Object.keys(item)[selectIndex[index]]);
      })
    }

    let animationType = props.animationType||'none';
    let transparent = typeof props.transparent==='undefined'?true:props.transparent;
    let visible = typeof props.visible==='undefined'?false:props.visible;
    let enable = typeof props.enable==='undefined'?true:props.enable;
    let inputValue = props.inputValue||'please chose';
    let confirmBtnText = props.confirmBtnText || '确定';
    let cancelBtnText = props.cancelBtnText || '取消';
    return {
      visible,
      transparent,
      animationType,
      enable,
      inputValue,
      selectIndex,
      selectedValue,
      confirmBtnText,
      cancelBtnText,
    };
  }
  _confirmChose(){
    this.props.data.map((item,index) =>{
      str = str +  this.props.data[index][this.state.selectedValue[index]].name;
    })
    this. _setModalVisible(false,'confirm');
    return str;
  }
  _setEventBegin(){
    if(this.state.enable){
      this._setModalVisible(true)
      this.refs.test.blur()
      valueCount.length = 0;
      indexCount.length = 0;
      for (let item of this.state.selectIndex){
        indexCount.push(item);
      }
      for(let temp of this.state.selectedValue){
        valueCount.push(temp);
      }
      str = '';
      return {"valueCount":valueCount,"indexCount":indexCount};
    }else{
      return "it's disabled"
    }
  }
  _setModalVisible(visible,type) {
    if(visible){
      this.setState({visible: visible});
      Animated.timing(
        this.state.animatedHeight,
        {toValue: top}
      ).start();
    }else{
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height}
      ).start(() => this._changeAnimateStatus(type));
    }
  }

  _changeAnimateStatus(type){
    if(type==='confirm'){this.setState({visible:false,inputValue: str});
      if(this.props.onResult){
        this.props.onResult(str);
      }}
    else if(type==='cancel'){
      this.state.selectIndex.length = 0;
      this.state.selectedValue.length = 0;
      for(let item of indexCount){
        this.state.selectIndex.push(item);
      }
      for(let temp of valueCount){
        this.state.selectedValue.push(temp);
      }
      this.setState({visible:false})
      return {indexCount,valueCount}
    }
  }
  render(){
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff',padding:20}
      : null;
    return (
      <View style={styles.container}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.visible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={[styles.modalContainer]}>
            <Animated.View style={[styles.innerContainer]}>
              <  View style={styles.nav}>
                <TouchableOpacity  style={styles.confirm}>
                  <Text className={"confirm"} onPress={() => {this._confirmChose()}}
                        style={[{textAlign:'left',marginLeft:10},this.props.confirmBtnStyle]} >{this.state.confirmBtnText}</Text>
                </TouchableOpacity>
                <Text style={[styles.pickerName,this.props.pickerNameStyle]}>{this.props.pickerName}</Text>
                <TouchableOpacity style={styles.cancel} >
                  <Text
                    className={"cancel"}
                    style={[{textAlign:'right',marginRight:10},this.props.cancelBtnStyle]}
                    onPress={() => {this._setModalVisible(false,'cancel')
                    }}
                  >{this.state.cancelBtnText}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickContainer}>
                {
                  this.props.data.map((row,index) =>{
                    return (
                      <PickRoll
                        key = {index}
                        style = {{flex:1}}
                        className = {"test"+index}
                        selectIndex = {this.state.selectIndex[index]}
                        selectedValue={this.state.selectedValue[index]}
                        pickerStyle = {{flex:1}}
                        data = {this.props.data[index]}
                        itemCount = {this.props.data.length}
                        onValueChange={(newValue,newIndex) => {
                          this.state.selectIndex.splice(index,1,newIndex);
                          this.state.selectedValue.splice(index,1,newValue);
                          this.setState({selectIndex:this.state.selectIndex,selectedValue:this.state.selectedValue});
                        }}
                      >{
                        Platform.OS === 'ios' &&(
                          Object.keys(this.props.data[index]).map((carMake) => (
                            <PickerItem
                              key={carMake}
                              value={carMake}
                              label={this.props.data[index][carMake].name}
                            />
                          )))
                      }
                      </PickRoll>)
                  })
                }
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
  }}

export default TMPicker;
