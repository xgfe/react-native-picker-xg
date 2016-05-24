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
    TouchableHighlight
} from 'react-native';
import TMpicker from './app/setup3';


let TMPicker = Platform.OS === 'ios' ? PickerIOS : TMpicker;


let CAR_MAKES_AND_MODELS = [
    {
    amc: {
        name: '2011年',
    },
    alfa: {
        name: '2012年',
    },
    aston: {
        name: '2013年',
    },
    audi: {
        name: '2014年',
    },
    austin: {
        name: '2015年',
    },
    borgward: {
        name: '2016年',
    },
    buick: {
        name: '2017年',
    },
    cadillac: {
        name: '2018年',
    },
    chevrolet: {
        name: '2019年',
    },
},
    {
        amc1: {
            name: '1月',
        },
        alfa1: {
            name: '2月',
        },
        aston1: {
            name: '3月',
        },
        audi1: {
            name: '4月',
        },
    },
    {
        cadillac2: {
            name: '1号',
        },
        chevrolet2: {
            name: '2号',
        },
    }

];

class TpickerEx extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            carMake: 'cadillac',
            modelIndex: 3,
        }
    }


    render() {
        return (
            <View style={testStyle.container}>
                            <TMPicker
                                data = {CAR_MAKES_AND_MODELS}
                                visible = {false}
                                transparent = {true}
                                >
                            </TMPicker>
            </View>

        );
    }
}

const testStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
AppRegistry.registerComponent('widgets', () => TpickerEx);
