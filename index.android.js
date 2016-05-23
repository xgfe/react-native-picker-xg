/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Platform,
    PickerIOS,
    TouchableOpacity,
    TextInput,
    Dimensions,
    TouchableHighlight,
    PixelRatio
} from 'react-native';
import Tpicker from './app/setup';


let TPicker = Platform.OS === 'ios' ? PickerIOS : Tpicker;
let PickerItem = TPicker.Item;


let CAR_MAKES_AND_MODELS = {
    amc: {
        name: 'AMC',
    },
    alfa: {
        name: 'Alfa-Romeo',
    },
    aston: {
        name: 'Aston Martin',
    },
    audi: {
        name: 'Audi',
    },
    austin: {
        name: 'Austin',
    },
    borgward: {
        name: 'Borgward',
    },
    buick: {
        name: 'Buick',
    },
    cadillac: {
        name: 'Cadillac',
    },
    chevrolet: {
        name: 'Chevrolet',
    },
};


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();

class TpickerEx extends Component {
    constructor(props, context){
        super(props, context);
        this._setInput = this._setInput.bind(this);
        this.state = {
            carMake: 'cadillac',
            modelIndex: 3,
            animationType: 'none',
            modalVisible: false,
            transparent: true,
            inputValue: 'please chose'
        }
    }

    _setTpickerVisible(){
        this.setState({modalVisible: true});
    }

    
    _setInput(value){
        this.setState({inputValue: value});
    }
    render() {
        return (
            <View style={testStyle.container}>
                            <TPicker
                                setInput = {this._setInput}
                                animationType = {this.state.animationType}
                                transparent = {this.state.transparent}
                                visible = {this.state.modalVisible}
                                selectedValue={this.state.carMake}
                                onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}
                                ref={(picker) => { this.picker = picker }} >

                                {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
                                    <PickerItem
                                        key={carMake}
                                        value={carMake}
                                        label={CAR_MAKES_AND_MODELS[carMake].name}
                                    />
                                ))}

                            </TPicker>
                <TextInput
                    ref = 'test'
                    onFocus={() => {this._setTpickerVisible(true)
                    this.refs.test.blur()}}
                    placeholder={'this is a test'}
                    value={this.state.inputValue}
                />
            </View>
        );
    }
}

const testStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

})
AppRegistry.registerComponent('widgets', () => TpickerEx);
