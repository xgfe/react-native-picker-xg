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
import {Cpicker,Tpicker} from './app/picker';


let wheel2 = [
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
]
let wheel3 = [
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

let level3Data =
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
let level2Data = {
  "四川":["w","e","q"],
  "浙江":["ww","ee","qq"],
}
let level4Data={
  "1":{
    "11":{
      "10":['a1','b1','c1'],
      "01":['d1','f1'],
    },
    "22":{
      "20":['w','d','qq'],
      '21':['wp','c'],
    },
  },
  "2":{
    "33":{
      "34":['e','qd','cd'],
      "56":['dw','vf','we'],
    },
    "09":{
      "v":['bb','t','bd'],
      'p':['vd','der','f'],
    }
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
        <Cpicker
          inputValue={"4 level picker"}
          level = {4}
          selectIndex = {[0,1,1,0]}
          data = {level4Data}
          visible = {false}
          transparent = {true}
        >
        </Cpicker>
        <Cpicker
          inputValue={"3 level picker"}
          level = {3}
          selectIndex = {[0,1,0]}
          data = {level3Data}
          visible = {false}
          transparent = {true}
        >
        </Cpicker>
        <Cpicker
          inputValue={"2 level picker"}
          level = {2}
          selectIndex = {[0,1]}
          data = {level2Data}
          visible = {false}
          transparent = {true}
        >
        </Cpicker>
        <Tpicker
          inputValue ={"3 wheel picker"}
          inputStyle = {testStyle.textInput}
          confirmBtnText = {"confirm"}
          cancelBtnText = {"cancel"}
          data = {wheel3}
          selectIndex = {[0,2,1]}
          visible = {false}
          transparent = {true}
        >
        </Tpicker>
        <Tpicker
          inputValue ={"2 wheel picker"}
          inputStyle = {testStyle.textInput}
          confirmBtnText = {"confirm"}
          cancelBtnText = {"cancel"}
          data = {wheel2}
          selectIndex = {[0,2]}
          visible = {false}
          transparent = {true}
        >
        </Tpicker>
      </View>

    );
  }
}

const testStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

})
AppRegistry.registerComponent('widgets', () => TpickerEx);
