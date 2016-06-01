import React, { Component,PropTypes } from 'react';
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
        let selfStyle = props.selfStyle;
        let inputStyle = props.inputStyle;
        let confirmBtnStyle = props.confirmBtnStyle;
        let cancelBtnStyle = props.cancelBtnStyle;
        let animationType = props.animationType||'fade';
        let transparent = typeof props.transparent==='undefined'?true:props.transparent;
        let visible = typeof props.visible==='undefined'?false:props.visible;
        let enable = typeof props.enable==='undefined'?true:props.enable;
        let inputValue = props.inputValue||'please chose';
        let confirmBtnText = props.confirmBtnText || '确定';
        let cancelBtnText = props.cancelBtnText || '取消';
        return {
            selfStyle,
            visible,
            transparent,
            animationType,
            enable,
            inputValue,
            selectIndex,
            selectedValue,
            inputStyle,
            confirmBtnText,
            cancelBtnText,
            confirmBtnStyle,
            cancelBtnStyle,
        };
    }
    _confirmChose(callback){
      this.props.data.map((item,index) =>{
        str = str +  this.props.data[index][this.state.selectedValue[index]].name;
      })
      callback();
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
          ).start(() => {if(type==='confirm'){this.setState({visible:visible,inputValue: str});
            if(this.props.onResult){
              this.props.onResult(str);
            }}
                          else{
            this.state.selectIndex.length = 0;
            this.state.selectedValue.length = 0;
            for(let item of indexCount){
                this.state.selectIndex.push(item);
            }
            for(let temp of valueCount){
                this.state.selectedValue.push(temp);
            }
            this.setState({visible:visible})
          }});
        }
    }


    render(){
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff'}
            : null;
        return (
            <View style={styles.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.visible}
                    onRequestClose={() => {this._setModalVisible(false)
                                           }}
                >
                    <View style={[styles.modalContainer, modalBackgroundStyle]}>
                        <Animated.View style={[styles.innerContainer, innerContainerTransparentStyle, this.state.selfStyle,{marginTop:this.state.animatedHeight}]}>
                            <  View style={styles.nav}>
                                <TouchableOpacity  style={styles.confirm}>
                                    <Text onPress={() => {
                    this._confirmChose(() => {
                      this. _setModalVisible(false,'confirm')
                    })
                    }}
                                        style={[{textAlign:'left',marginLeft:10},this.state.confirmBtnStyle]} >{this.state.confirmBtnText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} >
                                    <Text
                                        style={[{textAlign:'right',marginRight:10},this.state.cancelBtnStyle]}
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
                <TextInput
                    editable = {this.state.enable}
                    multiline={ true }
                    style = {[styles.textInput,this.props.inputStyle]}
                    ref = 'test'
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
    innerContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'column',
  },
  textInput:{
    padding:10,
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    height: 40,
  }
});

export default TMPicker;
