###The React-Native-Picker [![Build Status](https://travis-ci.org/xgfe/react-native-picker-xg.svg?branch=master)](https://travis-ci.org/xgfe/react-native-picker-xg) [![Coverage Status](https://coveralls.io/repos/github/xgfe/react-native-picker-xg/badge.svg?branch=master)](https://coveralls.io/github/xgfe/react-native-picker-xg?branch=master)
react native Picker component for both Android and iOS based on pure JavaScript.

### Main 
* The drawing of the wheel of the android come from [react-native-picker-android](https://github.com/beefe/react-native-picker-android).
* For the iOS, using PickerIOS as the basic.
* This whole picker includes two types of pickers, one is the basic wheel picker which the wheels have no connection with each other, another is the cascade wheel picker which the whees have connection with each other.

### How to install
```
npm install react-native-picker-xg --save
```
### Example
![image](https://raw.githubusercontent.com/lulutia/react-native-tpicker/master/show.gif)

### Properties 
  * For the cascade wheel Picker:
     * level: number, the number of the level of the wheels, and please make sure the number equals the length of the selectIndex's array if you have.[Mandatory]
     * data: [object, for more details to see the data structure part], the content of the picker.[Mandatory]
     * pickerNameStyle: CSS-layout, the style of the pickerName
     * cancelBtnStyle: CSS-layout, the style of the cancel button
     * confirmBtnStyle: CSS-layout, the confirm button's style
     * iconStyle: CSS-layout, the right downdrop button's style
     * iconName: string, the name of the icon
     * iconSize: number, the size of the icon
     * inputStyle: CSS-layout, the textInput's style
     * navStyle: CSS-layout, the style of the nav of the picker
     * textStyle: CSS-layout, the style of the inputText's inner text
     * pickerName: string, the text of the picker's name
     * inputValue: string, the initial text of the textInput
     * selectIndex: [number] ,initial selected item
     * enable: bool, to enable or disable the textInput
     * confirmBtnText: string, the text of the confirm button
     * cancelBtnText: string, the text of the cancel button
     * visible: bool, init to show the wheels, when 'enable' is false, nomatter the value of 'visible', the wheels will not show. And there should not be more than 1 wheels with 'visible' is true in one page.
      
  * For the basic wheel picker:
    * data: [array, for more details to see the data structure part], the content of the picker.[Mandatory]
    * pickerNameStyle: CSS-layout, the style of the pickerName
    * cancelBtnStyle: CSS-layout, the style of the cancel button
    * confirmBtnStyle: CSS-layout, the confirm button's style
    * inputStyle: CSS-layout, the textInput's style
    * navStyle: CSS-layout, the style of the nav of the picker
    * textStyle: CSS-layout, the style of the inputText's inner text
    * iconStyle: CSS-layout, the right downdrop button's style
    * pickerName: string, the text of the picker's name
    * inputValue: string, the initial text of the textInput
    * selectIndex: [number] ,initial selected item
    * enable: bool, to enable or disable the textInput
    * confirmBtnText: string, the text of the confirm button
    * cancelBtnText: string, the text of the cancel button
    * visible: bool, init to show the wheels, when 'enable' is false, nomatter the value of 'visible', the wheels will not show. And there should not be more than 1 wheels with 'visible' is true in one page.

###Method
* onResult: function, to expose the result you chose.

###Data structure
Basicly, you can realize as more as wheels as you like if you follow the data structure we set for you. However, take the size of the phone into consideration, we do not recommend more than 4 wheels.
* For the basic pickers: It's an array, the count of the wheel depends on how many objects you have. And the content of the wheel depends on the name of one objects of the outer objects.
By default we export the basic wheel picker, if you want to use the cascade wheel Picker you can do as follows:
```
let wheel3 = [
  {
    amc: {
      name: '2011年'
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
```

* For the cascade wheels: It'a an object in total, and the keys of one object become the content of the wheel. The last wheel's content is an array.
```
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
```
###Usage
We provide two ways for you to use this component.
####The first one
* Step1--initial and install
```
react-native init XXX
npm install react-native-picker-xg --save
```
* Step2--import and use in project
```
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

```
####The second one
* Step1--download the zip from the [github](https://github.com/xgfe/react-native-picker-xg)
* Step2--init an react-native project
* Step3--copy the zip's content into your project
* Step4--change the index.android.js's last line ``AppRegistry.registerComponent('widgets', () => TpickerEx);``'s widgets into your project's name.
* Step5--npm install

 
