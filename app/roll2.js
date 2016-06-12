/**
 * 依赖引入
 */
import React, { Component, PropTypes} from 'react';
import {
  View,
  Text,
  PanResponder
} from 'react-native';
import {rollStyles} from './style';
/**
 * 组件扩展
 */
class CPickroll extends Component {

  /**
   * 类型约束
   * @type {{data: PropTypes.array, passData: PropTypes.array, visible: PropTypes.bool, onValueChange: PropTypes.func, selectedValue: PropTypes.array, selectIndex: PropTypes.array}}
     */
  static propTypes = {
    //所有数据
    data: PropTypes.array,
    //单轮的数据
    passData: PropTypes.array,
    //modal是否可见
    visible: PropTypes.bool,
    //滚轮的值变化后的回调函数
    onValueChange: PropTypes.func,
    //选择的值的位置
    selectIndex: PropTypes.number,
    //整个picker的样式
    pickerStyle: View.propTypes.style,
    //单轮每个格子的样式
    itemAndroidStyle: Text.propTypes.style
  };

  /**
   * 构造函数
   * @param props {object} 继承的属性
   * @param context 上下文
     */
  constructor(props, context){
    super(props, context);
    this._move = this._move.bind(this);
    this.state = this._stateFromProps(props);
  }

  /**
   * 当props有新值时执行的操作
   * @param newProps {object}新的props
     */
  componentWillReceiveProps(newProps){
    this.setState(this._stateFromProps(newProps));
  }

  /**
   * 状态初始化
   * @param props {object} 继承的属性
   * @returns {{selectedIndex: number, items: Array, pickerStyle:View.propTypes.style, itemStyle:View.propTypes.style, onValueChange: func}}
   * @private
     */
  _stateFromProps(props){
    let selectedIndex = props.selectIndex;
    let items = [];
    let pickerStyle = props.pickerStyle;
    let itemStyle = props.itemAndroidStyle;
    let onValueChange = props.onValueChange;
    props.data.map((child,index) =>{
      child === props.selectedValue && ( selectedIndex = index );
      items.push({value: child, label: child});
    });
    return {
      selectedIndex,
      items,
      pickerStyle,
      itemStyle,
      onValueChange
    };
  }

  /**
   * 根据移动的距离重新布局
   * @param dy {number} 移动的距离
   * @private
     */
  _move(dy){
    let index = this.index;
    this.middleHeight = Math.abs(-index * 40 + dy);
    this.up && this.up.setNativeProps({
      style: {
        marginTop: (3 - index) * 30 + dy * 0.75
      }
    });
    this.middle && this.middle.setNativeProps({
      style: {
        marginTop: -index * 40 + dy
      }
    });
    this.down && this.down.setNativeProps({
      style: {
        marginTop: (-index - 1) * 30 + dy * 0.75
      }
    });
  }

  /**
   * 根据移动到的位置计算移动的距离
   * @param index {number} 移动到的位置
   * @returns {string}
   * @private
     */
  _moveTo(index){
    let _index = this.index;
    let diff = _index - index;
    let marginValue;
    if (diff && !this.isMoving) {
      marginValue = diff * 40;
      this._move(marginValue);
      this.index = index;
      this._onValueChange();
    } else { return 'you are moving'; }
  }

  /**
   * 处理移动(RN自带的函数)
   * @param evt
   * @param gestureState {object}
   * @returns {string}
     * @private
     */
  _handlePanResponderMove(evt, gestureState){
    let dy = gestureState.dy;
    if (this.isMoving) {
      return 'you are moving';
    }

    if (dy > 0) {
      this._move(dy > this.index * 40 ? this.index * 40 : dy);
    } else {
      this._move(dy < (this.index - this.state.items.length + 1) * 40 ? (this.index - this.state.items.length + 1) * 40 : dy);
    }
  }

  /**
   * 处理移动停止(RN自带的函数)
   * @param evt
   * @param gestureState {object}
   * @private
     */
  _handlePanResponderRelease(evt, gestureState){
    let middleHeight = this.middleHeight;
    this.index = middleHeight % 40 >= 20 ? Math.ceil(middleHeight / 40) : Math.floor(middleHeight / 40);
    this._move(0);
    this._onValueChange();
  }

  /**
   * 组件需要渲染前,对手势事件处理进行初始化
   */
  componentWillMount(){
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this)
    });
    this.isMoving = false;
    this.index = this.state.selectedIndex;
  }

  /**
   * 对单轮的每个格子进行初始化
   * @param items {array} 需要渲染的总的数据
   * @returns {{upItems: Array, middleItems: Array, downItems: Array}}
   * @private
     */
  _renderItems(items){
    let upItems = [], middleItems = [], downItems = [];
    items.forEach((item, index) => {

      upItems[index] = <Text
        key={'up' + index}
        className={'up' + index}
        style={[rollStyles.upText, this.state.itemStyle]}
        onPress={() => {this._moveTo(index);}} >
        {item.label}
      </Text>;

      middleItems[index] = <Text
        key={'mid' + index}
        className={'mid' + index}
        style={[rollStyles.middleText, this.state.itemStyle]}>{item.label}
      </Text>;

      downItems[index] = <Text
        key={'down' + index}
        className={'down' + index}
        style={[rollStyles.downText, this.state.itemStyle]}
        onPress={() => {this._moveTo(index);}} >
        {item.label}
      </Text>;

    });
    return { upItems, middleItems, downItems };
  }

  /**
   * 单轮上的数值变化后
   * @returns {object}
   * @private
     */
  _onValueChange(){
    var curItem = this.state.items[this.index];
    this.state.onValueChange && this.state.onValueChange(curItem.value);
    return curItem;
  }

  /**
   * 渲染函数
   * @returns {XML}
     */
  render(){
    let index = this.state.selectedIndex;
    let length = this.state.items.length;
    let items = this._renderItems(this.state.items);

    let upViewStyle = {
      marginTop: (3 - index) * 30,
      height: length * 30
    };
    let middleViewStyle = {
      marginTop:  -index * 40
    };
    let downViewStyle = {
      marginTop: (-index - 1) * 30,
      height:  length * 30
    };

    return (

      <View style={[rollStyles.container, this.state.pickerStyle]} {...this._panResponder.panHandlers}>
        <View style={rollStyles.up}>
          <View style={[rollStyles.upView, upViewStyle]} ref={(up) => { this.up = up; }} >
            { items.upItems }
          </View>
        </View>
        <View style={rollStyles.middle}>
          <View style={[rollStyles.middleView, middleViewStyle]} ref={(middle) => { this.middle = middle; }} >
            { items.middleItems }
          </View>
        </View>
        <View style={rollStyles.down}>
          <View style={[rollStyles.downView, downViewStyle]} ref={(down) => { this.down = down; }} >
            { items.downItems }
          </View>
        </View>
      </View>
    );
  }
}

export default CPickroll;
