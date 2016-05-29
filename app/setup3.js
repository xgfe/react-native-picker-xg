import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PropTypes,
    Dimensions,
    PixelRatio,
    PanResponder,
    TouchableOpacity,
    TextInput,
    Animated,
    Platform,
    Modal
} from 'react-native';


import Pickroll from './roll';

let PickRoll = Platform.OS === 'ios' ? PickerIOS : Pickroll;

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
        this.state.getValue = false;
        this.state.animatedHeight = new Animated.Value(height);
    }

    _stateFromProps(props){
        let selectIndex = [];
        if(typeof this.props.selectIndex==='undefined'){
            for(let item of this.props.data){
                selectIndex.push(0);
            }
        }else{
            selectIndex = props.selectIndex;}
        let selfStyle = props.selfStyle;
        let inputStyle = props.inputStyle;
        let animationType = props.animationType||'fade';
        let transparent = typeof props.transparent==='undefined'?true:props.transparent;
        let visible = typeof props.visible==='undefined'?false:props.visible;
        let enable = typeof props.enable==='undefined'?true:props.enable;
        let inputValue = props.inputValue||'please chose';
        let confirmBtnText = this.props.confirmBtnText || '确定';
        let cancelBtnText = this.props.cancelBtnText || '取消';
        return {
            selfStyle,
            visible,
            transparent,
            animationType,
            enable,
            inputValue,
            selectIndex,
            inputStyle,
            confirmBtnText,
            cancelBtnText,
        };
    }
    _confirmChose(callback){
        this.setState({getValue: true}, ()=>{
          while(true){
            if(valueCount.length === this.props.data.length){
              for(let item of valueCount){
                str = str + item + ' ';
              }
              let tempArray =[];
              for(let temp of indexCount){
                tempArray.push(temp);
              }
              this.setState({selectIndex: tempArray});
              break;
            }
          }
          callback();
        });
    }
    _setEventBegin(){
        if(this.state.enable){
            this._setModalVisible(true)
            this.refs.test.blur()
            valueCount.length = 0;
            indexCount.length = 0;
            str = '';
            this.setState({getValue: false});
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
          ).start(() => {if(type==='confirm'){this.setState({visible:visible,inputValue: str})}
                          else{this.setState({visible:visible})}});
        }
    }
    _handleValue(value,index){
        valueCount.push(value);
        indexCount.push(index);
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
                        <Animated.View style={[styles.innerContainer, innerContainerTransparentStyle,{marginTop:this.state.animatedHeight}]}>
                            <  View style={styles.nav}>
                                <TouchableOpacity  style={styles.confirm}>
                                    <Text onPress={() => {
                    this._confirmChose(() => {
                      this. _setModalVisible(false,'confirm')
                    })
                    }}
                                        style={{textAlign:'left',marginLeft:10}} >{this.state.confirmBtnText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} >
                                    <Text
                                        style={{textAlign:'right',marginRight:10}}
                                        onPress={() => {this._setModalVisible(false,'cancel')

                    }}
                                          >{this.state.cancelBtnText}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.pickContainer, this.state.selfStyle]}>

                                {
                                    this.props.data.map((row,index) =>{

                                        return (
                                            <PickRoll
                                                key = {index}
                                                selectIndex = {this.state.selectIndex[index]}
                                                getValue = {this.state.getValue}
                                                handleValue = {this._handleValue}
                                                pickerStyle = {{flex:1}}
                                                data = {this.props.data[index]}
                                                itemCount = {this.props.data.length}
                                                onValueChange={(carMake) => this.setState({carMake})}
                                            >

                                            </PickRoll>)
                                    })
                                }
                            </View>

                    </Animated.View>
                    </View>
                </Modal>
                <TextInput
                    editable = {this.state.enable}
                    style = {this.props.inputStyle}
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
  }

});

export default TMPicker;
