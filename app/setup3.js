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

import Tpicker from './setup';
import Pickroll from './roll';

let TPicker = Platform.OS === 'ios' ? PickerIOS : Tpicker;
let PickerItem = TPicker.Item;

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();
let valueCount = [];
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
        let animationType = props.animationType||'none';
        let transparent = typeof props.transparent==='undefined'?true:props.transparent;
        let visible = typeof props.visible==='undefined'?false:props.visible;
        let enable = typeof props.enable==='undefined'?true:props.enable;
        let inputValue = props.inputValue||'please chose';
        return {
           visible,
            transparent,
            animationType,
            enable,
            inputValue,
        };
    }
    _confirmChose(){
        this.setState({getValue: true});
        while(true){
            if(valueCount.length === this.props.data.length){
                for(let item of valueCount){
                    str = str + item + ' ';
                }
                this.setState({inputValue: str});
                break;
            }
        }
    }
    _setEventBegin(){
        if(this.state.enable){
            this._setModalVisible(true)
            this.refs.test.blur()
            valueCount.length = 0;
            str = '';
            this.setState({getValue: false});
        }
    }
    _setModalVisible(visible) {
        this.setState({visible: visible});
    }
    _handleValue(value){
        valueCount.push(value);
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
                            <View style={styles.pickContainer}>

                                {
                                    this.props.data.map((row,index) =>{
                                        return (
                                            <Pickroll
                                                key = {index}
                                                getValue = {this.state.getValue}
                                                handleValue = {this._handleValue}
                                                pickerStyle = {{flex:1}}
                                                data = {this.props.data[index]}
                                                onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}
                                            >
                                                {Object.keys(this.props.data[index]).map((carMake) => (
                                                    <PickerItem
                                                        key={carMake}
                                                        value={carMake}
                                                        label={this.props.data[index][carMake].name}
                                                    />
                                                ))}
                                            </Pickroll>)
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
               <Pickroll />
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
        width:width,
        flexDirection: 'row',
        height: 28,
        alignItems: 'center',
        backgroundColor:'white',
    },
    confirm: {
        flex:1,
    },
    cancel: {
        flex:1,

    },
    pickContainer:{
        justifyContent: 'center',
        alignItems: 'center',
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
