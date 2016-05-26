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


import CPickroll from './roll2';

let CPickerroll = Platform.OS === 'ios' ? PickerIOS : CPickroll;
let PickerItem = CPickerroll.Item;

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();
let valueCount = [];
let str = '';
let initData = [];
let choseValue = [];
let saveChoseValue = [];
let saveData = [];
class CPicker extends Component {

    static propTypes = {
        data: PropTypes.object,
    };


    componentWillMount(){
        let tempData = Object.assign({},this.props.data);
        let firstData = Object.keys(tempData);
        let key1 = firstData[0];
        let secondData = Object.keys(tempData[key1]);
        let key2 = secondData[0];
        let thirdData = tempData[key1][key2];
        initData.push(firstData,secondData,thirdData);
        choseValue.push(key1,key2,thirdData[0]);
       }
    shouldComponentUpdate(nextProps, nextState, context){
        return true;
    }
    constructor(props, context){
        super(props, context);
        this._setEventBegin = this._setEventBegin.bind(this);
        this._changeLayout = this._changeLayout.bind(this);
        this._cancelChose = this._cancelChose.bind(this);
        this.state = this._stateFromProps(this.props);
        this.state.getValue = false;
    }

    _stateFromProps(props){
        let selectIndex = [];
        if(typeof this.props.selectIndex==='undefined'){
                selectIndex.push(0,0,0);
        }else{
            selectIndex = props.selectIndex;}
        let selfStyle = props.selfStyle;
        let inputStyle = props.inputStyle;
        let animationType = props.animationType||'none';
        let transparent = typeof props.transparent==='undefined'?true:props.transparent;
        let visible = typeof props.visible==='undefined'?false:props.visible;
        let enable = typeof props.enable==='undefined'?true:props.enable;
        let inputValue = props.inputValue||'please chose';
        let passData = initData;
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
        };
    }
    _confirmChose(){
        this.setState({getValue: true});
        while(true){
            if(valueCount.length === 3){
                for(let item of valueCount){
                    str = str + item + ' ';
                }
                this.setState({inputValue: str});
                break;
            }
        }
    }
    _cancelChose(){
        choseValue.length=0;
        this.state.passData.length = 0;
        for(let item of saveChoseValue){
            choseValue.push(item);
        }
        for(let item1 of saveData){
            this.state.passData.push(item1);
        }
        console.log(saveData+"  "+saveChoseValue);

        this.setState({passData: this.state.passData,selectIndex:choseValue});
    }
    _setEventBegin(){
        if(this.state.enable){
            saveChoseValue.length = 0;
            saveData.length = 0;
            for(let item of choseValue){
                saveChoseValue.push(item);
            }
            for(let item1 of this.state.passData){
                saveData.push(item1);
            }
            console.log(saveData);
            this.setState({passData:this.state.passData,selectIndex:[this.state.passData[0].indexOf(saveChoseValue[0]),
                                                                     this.state.passData[1].indexOf(saveChoseValue[1]),
                                                                         this.state.passData[2].indexOf(saveChoseValue[2])]});
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
    _changeLayout(value,index,passData){
        choseValue.splice(index,1,value);
        if(index===0){
            passData.length = 1;
        let secondValue = choseValue[0];
        passData.push(Object.keys(this.props.data[secondValue]));
        let thirdValue = Object.keys(this.props.data[secondValue])[0];
        passData.push(this.props.data[secondValue][thirdValue]);
            let selectValue1 = this.state.passData[0].indexOf(value);
        this.setState({passData:passData,selectIndex:[selectValue1,0,0]});
            choseValue.length = 0;
            choseValue.push(passData[0][selectValue1],passData[1][0],passData[2][0]);
    }else if(index===1){
            passData.length = 2;
            passData.push(this.props.data[choseValue[0]][choseValue[1]]);
            let selectValue2 = this.state.passData[1].indexOf(value);
            let temp = this.state.selectIndex[0];
            this.setState({passData:passData,selectIndex:[temp,selectValue2,0]});
            choseValue.length = 0;
            choseValue.push(passData[0][temp],passData[1][selectValue2],passData[2][0]);
        }else{
            let temp1 = this.state.selectIndex[0];
            let temp2 = this.state.selectIndex[1];
            let selectValue3 = this.state.passData[2].indexOf(value);
            this.setState({passData:passData,selectIndex:[temp1,temp2,selectValue3]});
            choseValue.length = 0;
            choseValue.push(passData[0][temp1],passData[1][temp2],passData[2][selectValue3]);
        }}
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
                    this._setModalVisible(false)}}
                                          style={{textAlign:'left',marginLeft:10}} >Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancel} >
                                    <Text
                                        style={{textAlign:'right',marginRight:10}}
                                        onPress={() => {this._cancelChose()
                                        this._setModalVisible(false)
                    }}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.pickContainer, this.state.selfStyle]} >
                                {this.state.passData.map((item,index) =>{
                                    return(
                                            <CPickroll
                                                key = {index}
                                                pickIndex = {index}
                                                selectIndex = {this.state.selectIndex[index]}
                                                getValue = {this.state.getValue}
                                                handleValue = {this._handleValue}
                                                pickerStyle = {{flex:1}}
                                                data = {this.state.passData[index]}
                                                passData = {this.state.passData}
                                                itemCount = {this.props.data.length}
                                                onValueChange={this._changeLayout.bind(this)}
                                            >

                                            </CPickroll>)})}
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




export default CPicker;
