/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  ScrollView,
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
      '绵阳':['涪城区','安州区', '三台县', '平武县'],
      '广安':['容县','武胜']
    },
    '浙江':{
      '杭州':['西湖','银泰','玉泉'],
      '绍兴':['越城区','柯桥区','上虞区'],
      '温州':['鹿城区','瓯海区','瑞安市','永嘉县','苍南县']
    },
    '北京':{
      '朝阳区':[''],
      '海淀区':[''],
      '东城区':['']
    }
  };
let level2Data = {
  'American':['Alabama','Arizona','California', 'Connecticut', 'Georgia', 'Maine'],
  'Australia':['NSW','QLD','TAS']
};
let level4Data = {
  '1':{
    '11':{
      '111':['1111','1112','1113'],
      '112':['1121','1122']
    },
    '12':{
      '121':['1211','1212','1213'],
      '122':['1221','1222']
    }
  },
  '2':{
    '21':{
      '211':['2111','2112','2113'],
      '212':['2121','2122','2123']
    },
    '22':{
      '221':['2211','2212','2213'],
      '222':['2221','2222','2223']
    }
  }
};

class TpickerEx extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      str:'React Native Picker Demo',
      str1: 'without showing init chose and custom button words',
      str2: 'showing init chose',
      str3: 'cascadePicker with init index',
      str4: 'cascadePicker without init index',
      str5: 'cascadePicker with init show and custom styles',
      str6: 'disabled cascadePicker'
    };
  }

  // todo: ios can not init show two pickers
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.state.str}</Text>
        </View>
        <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str1}</Text>
        <Test3
          inputValue ={'basic picker without init chose'}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          onResult ={(str) => {this.setState({str1:str});}}
        />
        </View>
         <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str2}</Text>
        <Test3
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          selectIndex = {[0,2]}
          onResult ={(str) => {this.setState({str2:str});}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str5}</Text>
        <CascadePicker
          textStyle = {{color: 'red'}}
          navStyle = {{backgroundColor:'lightblue'}}
          inputValue={'4 level CascadePicker'}
          level = {4}
          data = {level4Data}
          iconName={'cog'}
          iconSize={14}
          inputStyle = {{borderColor: 'gray'}}
          confirmBtnStyle = {{color: 'blue'}}
          cancelBtnStyle={{color: 'red'}}
          pickerNameStyle={{fontSize: 12}}
          pickerName={'picker name test'}
          selectIndex = {[1,1,0,2]}
          visible = {true}
          iconStyle={{marginRight: 30}}
          onResult ={(str) => {this.setState({str5:str});}}
        />
        </View>
         <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str3}</Text>
        <CascadePicker
          inputValue={'3 level CascadePicker'}
          level = {3}
          selectIndex = {[0,1,0]}
          data = {level3Data}
          onResult ={(str) => {this.setState({str3:str});}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str4}</Text>
        <CascadePicker
          inputValue={'2 level CascadePicker'}
          level = {2}
          data = {level2Data}
          onResult ={(str) => {this.setState({str4:str});}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str6}</Text>
        <CascadePicker
          inputValue={'2 level CascadePicker'}
          level = {2}
          data = {level2Data}
          enable={false}
          onResult ={(str) => {this.setState({str6:str});}}
        />
        </View>
      </ScrollView>

    );
  }
}

AppRegistry.registerComponent('newpicker', () => TpickerEx);
