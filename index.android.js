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
},
    {
        amc1: {
            name: 'AMC1',
        },
        alfa1: {
            name: 'Alfa-Romeo1',
        },
        aston1: {
            name: 'Aston Martin1',
        },
        audi1: {
            name: 'Audi1',
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
    inputStyle: {
        marginTop: -200,
        backgroundColor: 'pink',
    },
    inputStyle2: {
        marginTop: -400,
        backgroundColor: 'lightblue',
    }

})
AppRegistry.registerComponent('widgets', () => TpickerEx);
