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
let PickerItem = PickRoll.Item;

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();
let valueCount = [];
let indexCount = [];
let str = '';

class TMPicker extends Component {

    static propTypes = {
        data: PropTypes.array,
    };

    constructor(props, context){
        super(props, context);
        this.state = this._stateFromProps(props);
        this.state.getValue = false;
    }

    _stateFromProps(props){
        let selectIndex = [];
        if(typeof this.props.selectIndex==='undefined'){
            console.log("yes")
            for(let item of this.props.data){
                selectIndex.push(0);
            }
        }else{
            selectIndex = props.selectIndex;}
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
            selectIndex,
            inputStyle,
        };
    }
    _confirmChose(){
        this.setState({getValue: true});
        while(true){
            if(valueCount.length === this.props.data.length){
                for(let item of valueCount){
                    str = str + item + ' ';
                }
                let tempArray =[];
                for(let temp of indexCount){
                    tempArray.push(temp);
                }
                this.setState({inputValue: str,selectIndex: tempArray});
                break;
            }
        }
    }
    _setEventBegin(){
        if(this.state.enable){
            this._setModalVisible(true)
            this.refs.test.blur()
            console.log(this.state.selectIndex);
            valueCount.length = 0;
            indexCount.length = 0;
            str = '';
            console.log(indexCount);
            this.setState({getValue: false});
        }
    }
    _setModalVisible(visible) {
        this.setState({visible: visible});
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
                    onRequestClose={() => {this._setModalVisible(false)}}
                >
                    <View style={[testStyle.container, modalBackgroundStyle]}>
                        <View style={[testStyle.innerContainer, innerContainerTransparentStyle]}>
                            <  View style={styles.nav}>
                                <TouchableOpacity  style={styles.confirm}>
                                    <Text onPress={() => {this. _confirmChose()
                    this._setModalVisible(false)}}
                                        style={{textAlign:'left',marginLeft:10}} >Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} >
                                    <Text
                                        style={{textAlign:'right',marginRight:10}}
                                        onPress={() => {this._setModalVisible(false)
                    }}
                                          >Cancel</Text>
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
                                                onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}
                                            >
                                                {Object.keys(this.props.data[index]).map((carMake) => (
                                                    <PickerItem
                                                        key={carMake}
                                                        value={carMake}
                                                        label={this.props.data[index][carMake].name}
                                                    />
                                                ))}
                                            </PickRoll>)
                                    })
                                }
                            </View>

                    </View>
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




export default TMPicker;
