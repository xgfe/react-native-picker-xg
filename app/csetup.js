/**
 * 依赖引用
 */
import React, { Component,  PropTypes} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  PickerIOS,
  Platform,
  Modal,
  Image
} from 'react-native';
import CPickroll from './roll2';
import {styles} from './style';
/**
 * 平台兼容
 */
let CPicker = Platform.OS === 'ios' ? PickerIOS : CPickroll;
let PickerItem = CPicker.Item;

/**
 * 全局变量声明
 */
let height = Dimensions.get('window').height;
let str = '';
let saveChoseValue = [];
let saveData = [];
let saveIndex = [];

/**
 * 组件扩展
 */
class CPickerroll extends Component {

  /**
   * 类型约束
   * @type {{data: PropTypes.object, pickerNameStyle: PropTypes.style, cancelBtnStyle: PropTypes.style, confirmBtnStyle: PropTypes.style, inputStyle: PropTypes.style, navStyle: PropTypes.style, textStyle: PropTypes.style, pickerName: PropTypes.string, inputValue: PropTypes.string, level: PropTypes.number, selectIndex: PropTypes.array, onResult: PropTypes.func}}
     */
  static propTypes = {
    //传递的数据,cascade类型针对两个轮及其以上的,所以格式为对象
    data: PropTypes.object,
    //picker名称样式
    pickerNameStyle: Text.propTypes.style,
    //取消按钮样式
    cancelBtnStyle: Text.propTypes.style,
    //确认按钮样式
    confirmBtnStyle: Text.propTypes.style,
    //输入框样式
    inputStyle: View.propTypes.style,
    //滚轮头部样式
    navStyle: View.propTypes.style,
    //输入框内部字体样式
    textStyle: Text.propTypes.style,
    //右边下拉按钮的样式
    iconStyle: View.propTypes.style,
    //picker的名称
    pickerName: PropTypes.string,
    //输入框内部文字初始值
    inputValue: PropTypes.string,
    //确定按钮的文字
    confirmBtnText: PropTypes.string,
    //取消按钮的文字
    cancelBtnText: PropTypes.string,
    //确定几层菜单,必填
    level: PropTypes.number,
    //确定默认选择的
    selectIndex: PropTypes.array,
    //获取选择的内容
    onResult: PropTypes.func,
    //picker是否能操作
    enable: PropTypes.bool
  };

  /**
   * 构造函数
   * @param props {object} 继承的属性
   * @param context 上下文
     */
  constructor(props, context){
    super(props, context);
    this._setEventBegin = this._setEventBegin.bind(this);
    this._changeLayout = this._changeLayout.bind(this);
    this._cancelChose = this._cancelChose.bind(this);
    this._pushOpera = this._pushOpera.bind(this);
    this._changeAnimateStatus = this._changeAnimateStatus.bind(this);
    this.state = this._stateFromProps(props);
    //初始化动画参数
    this.state.animatedHeight = new Animated.Value(height);
  }

  /**
   * 状态初始化
   * @param props {object} 继承的属性
   * @returns {{visible: bool, animationType: string, enable: bool, inputValue: string, passData: Array, selectIndex: Array, selectedValue: Array, confirmBtnText: string, cancelBtnText: string}}
   * @private
     */
  _stateFromProps(props){
    let selectIndex = [];
    let selectedValue = [];
    let passData = [];
    if (typeof props.selectIndex === 'undefined'){
      for (let temp = 0; temp < props.level; temp++){
        selectIndex.push(0);
      }
    } else {
      selectIndex = props.selectIndex;
    }

    let tempData = props.data;
    let finalData = props.data;
    for (let temp = 0; temp < props.level; temp++){
      if (temp !== props.level - 1){
        let data = Object.keys(tempData);
        let key = data[selectIndex[temp]];
        selectedValue.push(key);
        passData.push(data);
        tempData = tempData[key];
        finalData = finalData[key];
      }
      else {
        passData.push(finalData);
        selectedValue.push(finalData[selectIndex[temp]]);
      }
    }

    let animationType = props.animationType || 'none';
    let visible = typeof props.visible === 'undefined' ? false : props.visible;
    let enable = typeof props.enable === 'undefined' ? true : props.enable;
    let inputValue = props.inputValue || 'please chose';
    let confirmBtnText = props.confirmBtnText || '确定';
    let cancelBtnText = props.cancelBtnText || '取消';
    return {
      visible,
      animationType,
      enable,
      inputValue,
      passData,
      selectIndex,
      selectedValue,
      confirmBtnText,
      cancelBtnText
    };
  }

  /**
   * 确定操作
   * @returns {string} 选择的数据
   * @private
     */
  _confirmChose(){
    str = '';
    for (let item of this.state.selectedValue){
      str = str + item + ' ';
    }
    this.state.inputValue = str;
    this._setModalVisible(false,'confirm');
    return str;
  }

  /**
   * 数组操作
   * @param from {array} 拷贝的数组
   * @param to {array} 待拷贝的数组
   * @private
     */
  _pushOpera(from,to){
    to.length = 0;
    for (let item of from){
      to.push(item);
    }
  }

  /**
   * 取消操作
   * @returns {{saveChoseValue: Array, saveData: Array, saveIndex: Array}}
   * @private
     */
  _cancelChose(){
    this._pushOpera(saveChoseValue,this.state.selectedValue);
    this._pushOpera(saveData,this.state.passData);
    this._pushOpera(saveIndex,this.state.selectIndex);
    this._setModalVisible(false,'cancel');
    return {saveChoseValue:saveChoseValue,saveData:saveData,saveIndex:saveIndex};

  }

  /**
   * 行为触发(整个操作的开始
   * @returns {{saveChoseValue: Array, saveData: Array, saveIndex: Array}}
   * @private
     */
  _setEventBegin(){
    if (this.state.enable){
      this._pushOpera(this.state.selectedValue,saveChoseValue);
      this._pushOpera(this.state.passData,saveData);
      this._pushOpera(this.state.selectIndex,saveIndex);
      this.setState({passData:this.state.passData,selectIndex:this.state.selectIndex,selectedValue: this.state.selectedValue});
      this._setModalVisible(true);
      this.refs.test.blur();
      return {saveChoseValue:saveChoseValue,saveData:saveData,saveIndex:saveIndex};
    }
  }

  /**
   * Modal操作
   * @param visible {bool} 是否可见
   * @param type {string} 确定操作触发的类型
   * @private
     */
  _setModalVisible(visible,type) {
    if (visible){
      this.setState({visible: visible});
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height - 250}
      ).start();
    } else {
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height}
      ).start(() => this._changeAnimateStatus(type));
    }
  }

  /**
   * 根据触发的类型改变动画状态
   * @param type {string} 操作触发的类型
   * @private
     */
  _changeAnimateStatus(type){
    if (type === 'confirm'){
      this.setState({visible:false},() => {
        this.setState({inputValue: str});
        if (this.props.onResult){
          this.props.onResult(str);
        }
      });
    }
    else if (type === 'cancel'){
      this.setState({visible:false});
      this.setState({passData: this.state.passData,selectIndex:this.state.selectIndex,selectedValue: this.state.selectedValue});
    }
  }

  /**
   * 改变滚轮布局
   * @param value {string} 改变的数据
   * @param index {number} 改变的位置
   * @private
     */
  _changeLayout(value,index){
    this.state.selectedValue.splice(index,1,value);
    this.state.passData.length = index + 1;
    this.state.selectIndex.length = index;
    this.state.selectedValue.length = index;
    this.state.selectedValue.push(value);
    this.state.selectIndex.push(this.state.passData[this.state.passData.length -1].indexOf(value));
    if (this.props.level - index > 1){
      let data = this.props.data;
      for (let temp = 0; temp <= index; temp++){
        data = data[this.state.selectedValue[temp]];
      }
      for (let item = 0; item < this.props.level - index - 2; item++){
        let dataKeys = Object.keys(data);
        this.state.passData.push(dataKeys);
        this.state.selectIndex.push(0);
        this.state.selectedValue.push(dataKeys[0]);
        data = data[dataKeys[0]];
      }
      this.state.passData.push(data);
      this.state.selectIndex.push(0);
      this.state.selectedValue.push(data[0]);
    }
    this.setState({passData:this.state.passData,selectedValue:this.state.selectedValue,selectIndex:this.state.selectIndex});
  }

  /**
   * 渲染函数
   * @returns {XML}
     */
  render(){
    return (
      <View style={styles.container}>
        <Modal
          animationType={this.state.animationType}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={[styles.modalContainer]}>
            <Animated.View style={[styles.innerContainer,{top:this.state.animatedHeight}]}>
              <View style={[styles.nav,this.props.navStyle]}>
                <TouchableOpacity  style={styles.confirm}>
                  <Text className={"confirm"} onPress={() => {this. _confirmChose();}}
                        style={[styles.confirmBtnStyle,this.props.confirmBtnStyle]} >{this.state.confirmBtnText}</Text>
                </TouchableOpacity>
                <Text style={[styles.pickerName,this.props.pickerNameStyle]}>{this.props.pickerName}</Text>
                <TouchableOpacity style={styles.cancel} >
                  <Text
                    className={"cancel"}
                    onPress={() => {this._cancelChose()}}
                    style={[styles.cancelBtnStyle,this.props.cancelBtnStyle]}
                  >{this.state.cancelBtnText}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.pickContainer]} >
                {this.state.passData.map((item,index) =>{
                  this.index = index;
                  return (
                    <CPicker
                      key = {index}
                      className = { 'test' + index}
                      style = {{flex:1}}
                      selectIndex = {this.state.selectIndex[index]}
                      selectedValue = {this.state.selectedValue[index]}
                      pickerStyle = {{flex:1}}
                      data = {this.state.passData[index]}
                      passData = {this.state.passData}
                      onValueChange={(newValue, newIndex) => {this._changeLayout(newValue,index)}}
                    >
                      { Platform.OS === 'ios' &&((this.state.passData[index]).map((carMake) => (
                        <PickerItem
                          key={carMake}
                          value={carMake}
                          label={carMake}
                        />
                      )))}
                    </CPicker>)})}
              </View>
            </Animated.View>
          </View>
        </Modal>
        <View style={[styles.outerInput,this.props.inputStyle]}>
        <TextInput
          underlineColorAndroid={'transparent'}
          editable = {this.state.enable}
          style = {[styles.textInput,this.props.textStyle]}
          ref = 'test'
          onFocus={() => { this._setEventBegin();}}
          placeholder={this.state.inputValue}
          value={this.state.inputValue}
        /><TouchableOpacity className="arrowDown" style={styles.iconOuter} onPress={() => { this._setEventBegin()}}>
          <Image source={require('./img/arrow.png')} style={[styles.icon, this.props.iconStyle]} />
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

export default CPickerroll;
