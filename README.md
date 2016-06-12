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
     * inputStyle: CSS-layout, the textInput's style
     * navStyle: CSS-layout, the style of the nav of the picker
     * textStyle: CSS-layout, the style of the inputText's inner text
     * pickerName: string, the text of the picker's name
     * inputValue: string, the initial text of the textInput
     * selectIndex: [number] ,initial selected item
     * enable: bool, to enable or disable the textInput
     * confirmBtnText: string, the text of the confirm button
     * cancelBtnText: string, the text of the cancel button
      
  * For the basic wheel picker:
    * data: [array, for more details to see the data structure part], the content of the picker.[Mandatory]
    * pickerNameStyle: CSS-layout, the style of the pickerName
    * cancelBtnStyle: CSS-layout, the style of the cancel button
    * confirmBtnStyle: CSS-layout, the confirm button's style
    * inputStyle: CSS-layout, the textInput's style
    * navStyle: CSS-layout, the style of the nav of the picker
    * textStyle: CSS-layout, the style of the inputText's inner text
    * pickerName: string, the text of the picker's name
    * inputValue: string, the initial text of the textInput
    * selectIndex: [number] ,initial selected item
    * enable: bool, to enable or disable the textInput
    * confirmBtnText: string, the text of the confirm button
    * cancelBtnText: string, the text of the cancel button

###Method
* onResult: function, to expose the result you chose.

###Data structure
Basicly, you can realize as more as wheels as you like if you follow the data structure we set for you. However, take the size of the phone into consideration, we do not recommend more than 4 wheels.
* For the basic pickers: It's an array, the count of the wheel depends on how many objects you have. And the content of the wheel depends on the name of one objects of the outer objects. 
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
  Text,
  StyleSheet
} from 'react-native';
import {Cpicker,Tpicker} from 'react-native-picker-xg';
let wheel2 = [
  {
    amc: {
      name: '2011年'
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
  }
];

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
      str:'just a test',
      str1: 'just a test'
    };
  }


  render() {
    return (
      <View style={testStyle.container}>
        <Text style={{margin:10}}>{this.state.str}</Text>
        <Cpicker
          pickerNameStyle = {{color:'red'}}
          cancelBtnStyle = {{color:'blue'}}
          pickerName = {'just a test'}
          inputValue={'4 level picker'}
          level = {4}
          selectIndex = {[0,1,1,0]}
          data = {level4Data}
          onResult = {(str)=>{
            this.setState({str:str});
          }}
        />
        <Tpicker
          inputValue ={'2 wheel picker'}
          inputStyle = {testStyle.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          selectIndex = {[0,1]}
          onResult ={(str) => {this.setState({str1:str});}}
          visible = {false}
        />
        <Text style={{margin:10}}>{this.state.str1}</Text>
      </View>

    );
  }
}

const testStyle = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('widgets', () => TpickerEx);

```
####The second one
* Step1--download the zip from the [github](https://github.com/xgfe/react-native-picker-xg)
* Step2--init an react-native project
* Step3--copy the zip's content into your project
* Step4--change the index.android.js's last line ``AppRegistry.registerComponent('widgets', () => TpickerEx);``'s widgets into your project's name.
* Step5--npm install

 
