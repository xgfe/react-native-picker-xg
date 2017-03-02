/**
 * 依赖引用
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    Platform,
    PickerIOS,
    StatusBar,
    Modal,
    Image,
} from 'react-native';
import Pickroll from './basicRoll';
import {styles} from './pickerStyle';
import InputOuter from '../pickerTrigger/outer';
import Handle from '../pickerHandle/handle';
/**
 * 平台兼容
 */
let PickRoll = Platform.OS === 'ios' ? PickerIOS : Pickroll;
let modalHeight = Platform.OS === 'ios' ? 220 : (StatusBar.currentHeight + 220);
let PickerItem = PickRoll.Item;

/**
 * 全局变量声明
 */
let height = Dimensions.get('window').height;


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
    enable: PropTypes.bool,
    //icon name
    iconName: PropTypes.string,
    //icon size
    iconSize: PropTypes.number
  };

  /**
   * 构造函数
   * @param props {object} 继承的属性
   * @param context 上下文
     */
  constructor(props, context){
    super(props, context);
    this._changeAnimateStatus = this._changeAnimateStatus.bind(this);
    this._setEventBegin = this._setEventBegin.bind(this);
    this._confirmChose = this._confirmChose.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);

    this.state = {};
    this.state.visible = props.visible;
    this.state.animatedHeight = new Animated.Value(height);
  }

  componentWillMount() {
    this.valueCount = [];
    this.indexCount = [];
    this.str = '';
    if (this.state.visible) {
      this._setEventBegin();
    }
  }

  _calculateSelecteValue() {
    let selectIndex = [];
    let selectedValue = [];
    if (!this.props.selectIndex){
      for (let item of this.props.data){
        selectIndex.push(0);
        selectedValue.push(Object.keys(item)[0]);
      }
    } else {
      selectIndex = this.props.selectIndex.slice();
      this.props.data.map((item,index) =>{
        selectedValue.push(Object.keys(item)[selectIndex[index]]);
      });
    }
    return {selectIndex: selectIndex, selectedValue: selectedValue};
  }
  /**
   * 确定操作
   * @returns {string} 选择的数据
   * @private
     */
  _confirmChose(){
    this.props.data.map((item,index) =>{
      this.str = this.str +  this.props.data[index][this.select.selectedValue[index]].name;
    });
    this. _setModalVisible(false,'confirm');
    return this.str;
  }

  /**
   * 行为触发(整个操作的开始
   * @returns {*}
   * @private
     */
  _setEventBegin(){
    this.hack = false;
    if (this.props.enable){
      this._setModalVisible(true);
      this.str = '';
      return {valueCount: this.select.selectIndex, indexCount:this.select.selectedValue};
    } else {
      this.state.visible = false;
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
    if (visible){
      this.setState({visible: visible});
      Animated.timing(
        this.state.animatedHeight,
        {toValue: height - modalHeight,
          delay: 300}
      ).start();
    } else {
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
    if (type === 'confirm'){
      if (this.props.onResult){
        this.props.onResult(this.str, this.select.selectIndex, this.select.selectedValue);
      }
      this.setState({visible:false});
    }
    else if (type === 'cancel'){
      this.setState({visible:false});
    }
  }

  /**
   * 渲染函数
   * @returns {XML}
     */
  render(){
    if (!this.hack) {
      this.select = this._calculateSelecteValue();
      this.hack = false;
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType={this.props.animationType}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {this._setModalVisible(false);}}
        >
          <View style={[styles.modalContainer]}>
            <Animated.View style={[styles.innerContainer,{top:this.state.animatedHeight}]}>
              <Handle
                navStyle = {this.props.navStyle}
                confirmBtnStyle = {this.props.confirmBtnStyle}
                cancelBtnStyle = {this.props.cancelBtnStyle}
                pickerNameStyle ={this.props.pickerNameStyle}
                pickerName = {this.props.pickerName}
                confirmBtnText = {this.props.confirmBtnText}
                cancelBtnText = {this.props.cancelBtnText}
                confirmChose = {this._confirmChose}
                cancelChose = {this._setModalVisible}
                />
              <View style={styles.pickContainer}>
                {
                  this.props.data.map((row,index) =>{
                    return (
                      <PickRoll
                        key = {index}
                        style = {{flex:1}}
                        className = {'test' + index}
                        selectIndex = {this.select.selectIndex[index]}
                        selectedValue={this.select.selectedValue[index]}
                        pickerStyle = {{flex:1}}
                        data = {this.props.data[index]}
                        itemCount = {this.props.data.length}
                        onValueChange={(newValue,newIndex) => {
                          this.select.selectIndex.splice(index,1,newIndex);
                          this.select.selectedValue.splice(index,1,newValue);
                          if (Platform.OS === 'ios') {
                            this.hack = true;
                            this.forceUpdate();
                          }
                        }}
                      >{
                        Platform.OS === 'ios' && (
                          Object.keys(this.props.data[index]).map((carMake) => (
                            <PickerItem
                              key={carMake}
                              value={carMake}
                              label={this.props.data[index][carMake].name}
                            />
                          )))
                      }
                      </PickRoll>);
                  })
                }
              </View>
            </Animated.View>
          </View>
        </Modal>
        <InputOuter
          textStyle={this.props.textStyle}
          inputStyle={this.props.inputStyle}
          iconSize={this.props.iconSize}
          iconName={this.props.iconName}
          onPress={this._setEventBegin}
          iconStyle={this.props.iconStyle}
          enable={this.props.enable}
          placeholder={this.props.inputValue}/>
      </View>
    );
  }}

BasicPicker.defaultProps = {
  animationType: 'none',
  visible: false,
  enable: true,
  inputValue: 'please chose',
  confirmBtnText: '确定',
  cancelBtnText: '取消'
};
export default BasicPicker;
