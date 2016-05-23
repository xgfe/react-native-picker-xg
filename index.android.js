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
    Animated,
    Modal,
    Switch,
TouchableHighlight,
PixelRatio
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

var Button = React.createClass({
    getInitialState() {
        return {
            active: false,
        };
    },

    _onHighlight() {
        this.setState({active: true});
    },

    _onUnhighlight() {
        this.setState({active: false});
    },

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[testStyle.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[testStyle.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
});

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();

class TpickerEx extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            carMake: 'cadillac',
            modelIndex: 3,
            animationType: 'none',
            modalVisible: false,
            transparent: true,
            inputValue: 'please chose'
        }
    }


    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _setInputValue(value) {
        this.setState({inputValue: value});
    }


    render() {
        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };

        return (
            <View style={testStyle.container}>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this._setModalVisible(false)}}
                >
                    <View style={[testStyle.container, modalBackgroundStyle]}>
                        <View style={[testStyle.innerContainer, innerContainerTransparentStyle]}>
                            <TPicker
                                setContent = {this._setInputValue.bind(this)}
                                setModal = {this._setModalVisible.bind(this)}
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
                    </View>
                </Modal>
                <TextInput
                    ref = 'test'
                    onFocus={() => {this._setModalVisible(true)
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
    },
    innerContainer: {
        marginTop:top,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
})
AppRegistry.registerComponent('widgets', () => TpickerEx);
