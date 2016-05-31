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
import CPicker from './app/csetup';



let CAR_MAKES_AND_MODELS =
{
    "四川":{
        "成都":["青羊区","武侯区","温江区"],
        "绵阳":["绵阳中学","核弹基地"],
        "广安":["容县","武胜"]
    },
    "浙江":{
        "杭州":["西湖","银泰","玉泉"],
        "绍兴":["X1","X2","X3"],
        "place":["Y1","Y2","Y3","Y4","Y5"],
    },
    "some":{
        "place1":["Z1","Z2","Z3"],
        "place2":["Z4","Z5","Z6","Z7"],
        "place3":["A1","A2","A3","A4","A5","A6"],
    }
}

class TpickerEx extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {

        }
    }


    render() {
        return (
            <View style={testStyle.container}>
                            <CPicker
                                level = {3}
                                selectIndex = {[0,1,1]}
                                data = {CAR_MAKES_AND_MODELS}
                                visible = {false}
                                transparent = {true}
                                >
                            </CPicker>
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
