###The React-Native-Picker
react native Picker component for both Android and iOS.

### Main 
* The drawing of the wheel of the android come from [react-native-picker-android](https://github.com/beefe/react-native-picker-android).
* For the iOS, using PickerIOS as the basic.

### How to install
```
npm install react-native-tpicker --save
```

### Example
Two ways:
  * the first one
  
  ```
  react-native init pubtest
  npm install react-native-tpicker --save  
  
  change the index.android.js or the index.ios.js into:
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
 import TMpicker from 'react-native-tpicker';
 
 
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
     }
   }
 
 
   render() {
     return (
         <View style={testStyle.container}>
           <TMpicker
               inputStyle = {testStyle.textInput}
               confirmBtnText = {"confirm"}
               cancelBtnText = {"cancel"}
               data = {CAR_MAKES_AND_MODELS}
               selectIndex = {[0,2,1]}
               visible = {false}
               transparent = {true}
           >
           </TMpicker>
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
   textInput:{
     padding:20,
     borderBottomWidth:1,
     borderBottomColor: 'grey',
     height: 40,
   }
 })
 AppRegistry.registerComponent('pubtest', () => TpickerEx);

  ```
  * the second one
    * download the zip from the github
    ```
    npm install react --save
    npm install react-native --save
    
    ```
    * the example has already in the index.android.js and index.ios.js
    
### Properties
 * selectIndex: [number] ,initial selected item
 * selfStyle: CSS-layout, the innerContainer's style
 * inputStyle: CSS-layout, the textInput's style
 * confirmBtnText: string, the text of the confirm button
 * cancelBtnText: string, the text of the cancel button
 * confirmBtnStyle: CSS-layout, the confirm button's style
 * cancelBtnStyle: CSS-layout, the cancel button;s style
 * enable: bool, to enable or disable the textInput
 * inputValue: string, the initial text of the textInput
 
