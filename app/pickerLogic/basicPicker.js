/**
 * 依赖引用
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Animated,
    Platform,
    PickerIOS,
    StatusBar,
    Modal,
    Image,
} from 'react-native';
import Pickroll from './roll';
import {styles} from './pickerStyle';
import InputOuter from '../pickerTrigger/outer';
import Handle from '../pickerHandle/handle';
/**
 * 平台兼容
 */
let PickRoll = Platform.OS === 'ios' ? PickerIOS : Pickroll;
let PickerItem = PickRoll.Item;

/**
 * 全局变量声明
 */
let height = Dimensions.get('window').height;
let valueCount = [];
    let indexCount = [];
    let str = '';

/**
 * 组件扩展
 */
class BasicPicker extends Component {

  /**
   * 类型约束
   * @type {{data: Requireable<any>, visible: Requireable<any>, transparent: Requireable<any>, animationType: Requireable<any>, enable: Requireable<any>, inputValue: Requireable<any>}}
     */
  static propTypes = {
    //传递的数据
    data: PropTypes.array,
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
    // 根据选择的初始值来初始化输入框内部文字
    inputInit: PropTypes.bool,
    //输入框内部文字初始值
    inputValue: PropTypes.string,
    //确定按钮的文字
    confirmBtnText: PropTypes.string,
    //取消按钮的文字
    cancelBtnText: PropTypes.string,
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
    this._changeAnimateStatus = this._changeAnimateStatus.bind(this);
    this._pushOpera = this._pushOpera.bind(this);
    this.state = this._stateFromProps(props);
    this._setEventBegin = this._setEventBegin.bind(this);
    this._confirmChose = this._confirmChose.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);
    this.state.animatedHeight = new Animated.Value(height);
  }

  componentWillMount() {
    //this._setEventBegin();
  }
  /**
   * 状态初始化
   * @param props {object} 继承的属性
   * @returns {{visible: bool, animationType: string, enable: bool, inputValue: string, selectIndex: Array, selectedValue: Array, confirmBtnText: string, cancelBtnText: string}}
   * @private
     */
  _stateFromProps(props){
    let selectIndex = [];
    let selectedValue = [];
    if(typeof props.selectIndex==='undefined'){
      for(let item of props.data){
        selectIndex.push(0);
        selectedValue.push(Object.keys(item)[0]);
      }
    }else{
      selectIndex = props.selectIndex;
      props.data.map((item,index) =>{
        selectedValue.push(Object.keys(item)[selectIndex[index]]);
      })
    }
    let animationType = props.animationType||'none';
    let visible = typeof props.visible==='undefined'?false:props.visible;
    let enable = typeof props.enable==='undefined'?true:props.enable;
    let inputValue = props.inputValue||'please chose';
    let inputInit = typeof props.enable==='undefined'?false:props.enable;
    let confirmBtnText = props.confirmBtnText || '确定';
    let cancelBtnText = props.cancelBtnText || '取消';
    return {
      visible,
      animationType,
      enable,
      inputValue,
      selectIndex,
      selectedValue,
      confirmBtnText,
      cancelBtnText,
      inputInit
    };
  }

  componentDidMount() {
    if (this.state.inputInit) {

    }
  }
  /**
   * 确定操作
   * @returns {string} 选择的数据
   * @private
     */
  _confirmChose(){
    this.props.data.map((item,index) =>{
      str = str +  this.props.data[index][this.state.selectedValue[index]].name;
    })
    this. _setModalVisible(false,'confirm');
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
   * 行为触发(整个操作的开始
   * @returns {*}
   * @private
     */
  _setEventBegin(){
    console.debug(this.state);
    if(this.state.enable){
      this._setModalVisible(true)
      this._pushOpera(this.state.selectIndex, indexCount);
      this._pushOpera(this.state.selectedValue,valueCount);
      str = '';
      return {valueCount: valueCount, indexCount:indexCount};
    }else{
      return 'it is disabled';
    }
  }

  /**
   * Modal操作
   * @param visible {bool} 是否可见
   * @param type {string} 确定操作触发的类型
   * @private
     */
  _setModalVisible(visible,type) {
    if(visible){
      this.setState({visible: visible});
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height-StatusBar.currentHeight-220}
      ).start();
    }else{
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height}
      ).start(() => this._changeAnimateStatus(type));
    }
  }

  /**
   * 根据触发的状态改变动画的状态
   * @param type {string} 操作触发的类型
   * @returns {{indexCount: Array, valueCount: Array}}
   * @private
     */
  _changeAnimateStatus(type){
    if(type==='confirm'){this.setState({visible:false,inputValue: str});
      if(this.props.onResult){
        this.props.onResult(str);
      }}
    else if(type==='cancel'){
      this._pushOpera(indexCount, this.state.selectIndex);
      this._pushOpera(valueCount, this.state.selectedValue);
      this.setState({visible:false})
      return {indexCount,valueCount}
    }
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
              <Handle
                confirmChose = {this._confirmChose}
                cancelChose = {this._setModalVisible}
                pickerName = {this.props.pickerName}
                confirmBtnText = {this.state.confirmBtnText}
                cancelBtnText = {this.state.cancelBtnText}
                />
              <View style={styles.pickContainer}>
                {
                  this.props.data.map((row,index) =>{
                    return (
                      <PickRoll
                        key = {index}
                        style = {{flex:1}}
                        className = {"test"+index}
                        selectIndex = {this.state.selectIndex[index]}
                        selectedValue={this.state.selectedValue[index]}
                        pickerStyle = {{flex:1}}
                        data = {this.props.data[index]}
                        itemCount = {this.props.data.length}
                        onValueChange={(newValue,newIndex) => {
                          this.state.selectIndex.splice(index,1,newIndex);
                          this.state.selectedValue.splice(index,1,newValue);
                          this.setState({selectIndex:this.state.selectIndex,selectedValue:this.state.selectedValue});
                        }}
                      >{
                        Platform.OS === 'ios' &&(
                          Object.keys(this.props.data[index]).map((carMake) => (
                            <PickerItem
                              key={carMake}
                              value={carMake}
                              label={this.props.data[index][carMake].name}
                            />
                          )))
                      }
                      </PickRoll>)
                  })
                }
              </View>
            </Animated.View>
          </View>
        </Modal>
        <InputOuter
          onPress={this._setEventBegin}
          editable={this.state.enable}
          placeholder={this.state.inputValue}
          value={this.state.inputValue}/>
      </View>
    );
  }}

export default BasicPicker;
