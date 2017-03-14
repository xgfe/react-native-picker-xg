/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import Test3, {CascadePicker} from './app/pickerLogic/picker';
import styles from './style';

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
      str1: 'with asynchronous request',
      selectIndex1: [0, 2, 1],
      str2: 'without showing init chose and custom button words',
      selectIndex2: [0, 1],
      str3: 'showing init chose',
      selectIndex3: [],
      str4: '川菜 重庆小面',
      // selectIndex4: [1, 1, 0, 2],
      str5: '地方菜 东北菜',
      str6: 'cascadePicker with init show and custom styles',
      str7: 'disabled cascadePicker',
      data: [],
      Cdata: [],
      Cdata1: [],
      selectIndex4: [],
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
    fetch('http://10.5.234.227:8282/crm/app/category/r/list?parentId=0&bdId=2020529&ua=20200_android&token=623b9e9f6ae38444e945ae53ced523efefed447b3c4c610af6d94d47469cf37f48d192760aef1cc66b06a2e648fa5dcabefe4ff9fafde8fc6d0b275dc76a8ea750a350c95091f814009e635c84fd78f58eadfef564b26c6e3cb223564577486a')
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data.data) {
        that._handle(0, data.data);
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
      let url = 'http://10.5.234.227:8282/crm/app/category/r/list?parentId=' + cateMap[index - 1] + '&bdId=2020529&ua=20200_android&token=623b9e9f6ae38444e945ae53ced523efefed447b3c4c610af6d94d47469cf37f48d192760aef1cc66b06a2e648fa5dcabefe4ff9fafde8fc6d0b275dc76a8ea750a350c95091f814009e635c84fd78f58eadfef564b26c6e3cb223564577486a';
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
        this.forceUpdate();
        return;
      }
      console.debug(cateMap[index - 1]);
      let url = 'http://10.5.234.227:8282/crm/app/category/r/list?parentId=' + cateMap[index - 1] + '&bdId=2020529&ua=20200_android&token=623b9e9f6ae38444e945ae53ced523efefed447b3c4c610af6d94d47469cf37f48d192760aef1cc66b06a2e648fa5dcabefe4ff9fafde8fc6d0b275dc76a8ea750a350c95091f814009e635c84fd78f58eadfef564b26c6e3cb223564577486a';
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that.state.Cdata1[1] = data.data;
        that.state.Cdata1[2] = [];
        this.forceUpdate();
      });
    }
    if (wheelNumber === 1) {
      if (index === 0) {
        that.state.Cdata1[2] = [];
        this.forceUpdate();
        return;
      }
      let url = 'http://10.5.234.227:8282/crm/app/category/r/list?parentId=' + cateMap[index - 1] + '&bdId=2020529&ua=20200_android&token=623b9e9f6ae38444e945ae53ced523efefed447b3c4c610af6d94d47469cf37f48d192760aef1cc66b06a2e648fa5dcabefe4ff9fafde8fc6d0b275dc76a8ea750a350c95091f814009e635c84fd78f58eadfef564b26c6e3cb223564577486a';
      fetch(url)
      .then((res) => {
        return res.json();
      }).then((data) => {
        that.state.Cdata1[2] = data.data;
        this.forceUpdate();
      });
    }
  }
  _handle(level, data) {
    this.setState({Cdata1: [data,[],[]]});
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
    console.debug('1---------1');
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.state.str}</Text>
        </View>
       <TouchableWithoutFeedback style={styles.button} onPress={() => {this._getLevel();}}>
          <View style={styles.button}>
            <Text style={{color:'#fff'}}>获取数据</Text>
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
            this.setState({str1:str, selectIndex1: selectIndex});}}
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
            this.setState({str2:str, selectIndex2: selectIndex});}}
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
            this.setState({str3:str, selectIndex3: selectIndex});}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str4}</Text>
        <CascadePicker
          inputValue = {this.state.str4}
          textStyle = {{color: 'red'}}
          navStyle = {{backgroundColor:'lightblue'}}
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
          onResult ={(data, index,str) => {this.setState({str4:str});}}
          onCancel = {() => {this.state.Cdata[1] = [];}}
        />
        </View>
          <View>
        <Text style={styles.demoValue}>Cascade Picker value: {this.state.str4}</Text>
        <CascadePicker
          inputValue = {this.state.str5}
          level = {3}
          selectedValue ={this.state.choseValue}
          data = {this.state.Cdata1}
          onWheelChange={(value, index, wheelNumber) => {this._getLevel3(value, index, wheelNumber);}}
          onResult ={(data, index,str) => {this._onResult(data, index, str);}}
          onCancel = {(data)=>{this._onCancel(data);}}
        />
        </View>

      </ScrollView>

    );
  }
}

AppRegistry.registerComponent('newpicker', () => TpickerEx);
