/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import Test3, {CascadePicker} from '../app/pickerLogic/picker';
import styles from './style';
import {wheel2} from './data';

// your own ip
const ip = 'http://yourownip:3000/';


export default class TpickerEx extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      str: 'React Native Picker Demo',
      str1: 'with asynchronous request',
      selectIndex1: [0, 2, 1],
      str3: 'without showing init chose and custom button words',
      selectIndex2: [0, 1],
      str2: 'showing init chose',
      selectIndex3: [],
      str4: '川菜 重庆小面',
      str5: '地方菜 东北菜',
      str6: 'cascadePicker with init show and custom styles',
      str7: 'disabled cascadePicker',
      data: [],
      Cdata: [],
      Cdata1: [],
      selectIndex4: [],
      loadingState: [false, false, false, false]
    };
  }

  _getData() {
    let that = this;
    fetch('http://172.18.47.119:3000/data').then((res) => {
      return res.json();
    }, (err) => {
      console.debug(err);
    }).then((data) => {
      that.setState({data: data});
    }, () => {
      console.debug('fail');
    });
  }

  _getLevel() {
    let that = this;
    let url = ip + 'cascade';
    fetch(url)
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data.data) {
        that._handle(0, data.data);
      }
    });
  }

  _getLevel1() {
    let that = this;
    let url = ip + 'data';
    fetch(url)
    .then((res) => {
      console.debug(res);
      return res.json();
    }).then((data) => {
      if (data) {
        that.setState({data: data});
      }
    });
  }
  _getLevel2(value, index, wheelNumber) {
    let that = this;
    let cateMap = [10003,10002,10004,10000,10005,10001,10006,10007,10008,10009];
    if (wheelNumber === 0) {
      if (index === 0) {
        that._handle2(0, [], 0);
        return;
      }
      console.debug(cateMap[index - 1]);
      let url = ip + cateMap[index - 1];
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that._handle2(0, data.data, index);
      });
    }
  }

  _getLevel3(value, index, wheelNumber) {
    let that = this;
    let cateMap = [10003,10002,10004,10000,10005,10001,10006,10007,10008,10009];
    if (wheelNumber === 0) {
      if (index === 0) {
        that.state.Cdata1[1] = [];
        that.state.Cdata1[2] = [];
        that.state.Cdata1[3] = [];
        this.forceUpdate();
        return;
      }
      let url = ip + cateMap[index - 1];
      this.setState({loadingState: [false, true, true, true]});
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that.state.Cdata1[1] = data.data;
        that.state.Cdata1[2] = [];
        that.state.Cdata1[3] = [];
        this.state.loadingState = [false, false, false, false];
        this.forceUpdate();
      });
    }
    if (wheelNumber === 1) {
      if (index === 0) {
        that.state.Cdata1[2] = [];
        that.state.Cdata1[3] = [];
        this.forceUpdate();
        return;
      }
      let url = ip + cateMap[index - 1];
      this.setState({loadingState: [false, false, true, true]});
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that.state.Cdata1[2] = data.data;
        that.state.Cdata1[3] = [];
        this.state.loadingState = [false, false, false, false];
        this.forceUpdate();
      });
    }
    if (wheelNumber === 2) {
      if (index === 0) {
        that.state.Cdata1[3] = [];
        this.forceUpdate();
        return;
      }
      let url = ip + cateMap[index - 1];
      this.setState({loadingState: [false, false, false, true]});
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that.state.Cdata1[3] = data.data;
        this.state.loadingState = [false, false, false, false];
        this.forceUpdate();
      });
    }
  }
  _handle(level, data) {
    this.setState({Cdata1: [data,[],[],[]]});
  }
  _handle2(level, data, index) {
    this.state.Cdata[1] = data;
    this.forceUpdate();
  }
  _onResult(data, index, str) {
    this.state.Cdata1 = data.slice();
    this.setState({str5: str});
  }

  _onCancel(data) {
    this.state.Cdata1 = data.slice();
    // 一定要有这句否则直接点击传入的数据还是没变
    this.forceUpdate();
  }
  // todo: ios can not init show two pickers
  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.state.str}</Text>
        </View>
       <TouchableWithoutFeedback style={styles.button} onPress={() => {this._getLevel();}}>
          <View style={styles.button}>
            <Text style={{color: '#fff'}}>获取联动picker数据</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.button} onPress={() => {this._getLevel1();}}>
          <View style={styles.button}>
            <Text style={{color: '#fff'}}>获取基本picker数据</Text>
          </View>
        </TouchableWithoutFeedback>
       <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str1}</Text>
        <Test3
          inputValue ={this.state.str1}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {this.state.data}
          selectIndex = {this.state.selectIndex1}
          enable = {this.state.data.length > 0}
          onResult ={(str, selectIndex, selectValue) => {
            this.setState({str1: str, selectIndex1: selectIndex});}}
        />
        </View>
        <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str2}</Text>
        <Test3
          inputValue ={this.state.str2}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          selectIndex = {this.state.selectIndex2}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          onResult ={(str, selectIndex, selectValue) => {
            this.setState({str2: str, selectIndex2: selectIndex});}}
        />
        </View>
        <View>
        <Text style={styles.demoValue}>Basic Picker value: {this.state.str3}</Text>
        <Test3
          inputValue = {this.state.str3}
          inputStyle = {styles.textInput}
          confirmBtnText = {'confirm'}
          cancelBtnText = {'cancel'}
          data = {wheel2}
          selectIndex = {this.state.selectIndex3}
          onResult ={(str, selectIndex, selectValue) => {
            this.setState({str3: str, selectIndex3: selectIndex});}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str4}</Text>
        <CascadePicker
          inputValue = {this.state.str4}
          textStyle = {{color: 'red'}}
          navStyle = {{backgroundColor: 'lightblue'}}
          level = {2}
          data = {this.state.Cdata}
          iconName={'cog'}
          iconSize={14}
          inputStyle = {{borderColor: 'gray'}}
          confirmBtnStyle = {{color: 'blue'}}
          cancelBtnStyle={{color: 'red'}}
          pickerNameStyle={{fontSize: 12}}
          pickerName={'picker name test'}
          iconStyle={{marginRight: 30}}
          onWheelChange={(value, index, wheelNumber) => {this._getLevel2(value, index, wheelNumber);}}
          onResult ={(data, index, str) => {this.setState({str4: str});}}
          onCancel = {() => {this.state.Cdata[1] = [];}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker</Text>
        <CascadePicker
          inputValue = {this.state.str5}
          level = {4}
          selectedValue ={this.state.choseValue}
          data = {this.state.Cdata1}
          onWheelChange={(value, index, wheelNumber) => {this._getLevel3(value, index, wheelNumber);}}
          onResult ={(data, index, str) => {this._onResult(data, index, str);}}
          onCancel = {(data)=>{this._onCancel(data);}}
          loading = {this.state.loadingState}
        />
        </View>
      </ScrollView>

    );
  }
}
