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
    Animated
} from 'react-native';
import Tpicker from './app/setup';
import Icon from 'react-native-vector-icons/FontAwesome';

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
               
                <TPicker
                    style={{opacity: this.state.fadeAnim}}
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
            </View>
        );
    }
}

const testStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3c3c3c',
    }
})
AppRegistry.registerComponent('widgets', () => TpickerEx);
