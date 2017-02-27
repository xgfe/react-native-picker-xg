/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Test3, {CascadePicker}from './app/pickerLogic/picker';
import styles from './style'

let wheel2 = [
  {
    amc: {
      name: '2011年'
    },
    alfa: {
      name: '2012年'
    },
    aston: {
      name: '2013年'
    },
    audi: {
      name: '2014年'
    },
    austin: {
      name: '2015年'
    },
    borgward: {
      name: '2016年'
    },
    buick: {
      name: '2017年'
    },
    cadillac: {
      name: '2018年'
    },
    chevrolet: {
      name: '2019年'
    }
  },
  {
    amc1: {
      name: '1月'
    },
    alfa1: {
      name: '2月'
    },
    aston1: {
      name: '3月'
    },
    audi1: {
      name: '4月'
    }
  }
];

let wheel3 = [
  {
    amc: {
      name: '2011年'
    },
    alfa: {
      name: '2012年'
    },
    aston: {
      name: '2013年'
    },
    audi: {
      name: '2014年'
    },
    austin: {
      name: '2015年'
    },
    borgward: {
      name: '2016年'
    },
    buick: {
      name: '2017年'
    },
    cadillac: {
      name: '2018年'
    },
    chevrolet: {
      name: '2019年'
    }
  },
  {
    amc1: {
      name: '1月'
    },
    alfa1: {
      name: '2月'
    },
    aston1: {
      name: '3月'
    },
    audi1: {
      name: '4月'
    }
  },
  {
    cadillac2: {
      name: '1号'
    },
    chevrolet2: {
      name: '2号'
    }
  }
];

let level3Data =
  {
    '四川':{
      '成都':['青羊区','武侯区','温江区'],
      '绵阳':['绵阳中学','核弹基地'],
      '广安':['容县','武胜']
    },
    '浙江':{
      '杭州':['西湖','银泰','玉泉'],
      '绍兴':['X1','X2','X3'],
      'place':['Y1','Y2','Y3','Y4','Y5']
    },
    'some':{
      'place1':['Z1','Z2','Z3'],
      'place2':['Z4','Z5','Z6','Z7'],
      'place3':['A1','A2','A3','A4','A5','A6']
    }
  };
let level2Data = {
  '四川':['w','e','q'],
  '浙江':['ww','ee','qq']
};
let level4Data = {
  '1':{
    '11':{
      '10':['a1','b1','c1'],
      '01':['d1','f1']
    },
    '22':{
      '20':['w','d','qq'],
      '21':['wp','c']
    }
  },
  '2':{
    '33':{
      '34':['e','qd','cd'],
      '56':['dw','vf','we']
    },
    '09':{
      'v':['bb','t','bd'],
      'p':['vd','der','f']
    }
  }
};

class TpickerEx extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      str:'React Native Picker Demo',
      str1: 'without showing init chose',
      str2: 'showing init chose'
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.state.str}</Text>
        </View>
        <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str1}</Text>
        <Test3
          inputInit = {false}
          inputValue ={'basic picker without init chose'}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          selectIndex = {[0,1]}
          onResult ={(str) => {this.setState({str1:str});}}
          visible = {false}
        />
        </View>
         <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str2}</Text>
        <Test3
          inputInit = {true}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          selectIndex = {[0,2]}
          onResult ={(str) => {this.setState({str2:str});}}
          visible = {false}
        />
        </View>
      </View>

    );
  }
}

AppRegistry.registerComponent('newpicker', () => TpickerEx);
