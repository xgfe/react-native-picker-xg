/**
 * 依赖引入
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    PanResponder,
    Animated
} from 'react-native';
import {rollStyles} from './style';

/**
 * 组件扩展
 */
class Pickroll extends Component {

  /**
   * 类型约束
   * @type {{data: PropTypes.array, passData: PropTypes.array, visible: PropTypes.bool, onValueChange: PropTypes.func, selectedValue: PropTypes.array, selectIndex: PropTypes.array}}
     */
  static propTypes = {
    //所有数据
    data: PropTypes.object,
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
    this.state = this._stateFromProps(props);
    this.moveDy = 0;
    this.endHeight = - 36 * this.state.initSelectedIndex + 72;
    //相对高度
    this.state._viewAnimation = new Animated.Value(0);
    //绝对高度
    this.state._viewHeight = new Animated.Value(- 36 * this.state.initSelectedIndex + 72);
    //距离计算
    this.state._scrollHeight = new Animated.Value(0);
  }

  /**
   * 状态初始化
   * @param props {object} 继承的属性
   * @returns {{selectedIndex: number, items: Array, pickerStyle:View.propTypes.style, itemStyle:View.propTypes.style, onValueChange: func}}
   * @private
     */
  _stateFromProps(props){
    let selectedIndex = this.props.selectIndex;
    let initSelectedIndex = this.props.selectIndex;
    let items = [];
    let pickerStyle = props.pickerStyle;
    let itemStyle = props.itemStyle;
    let onValueChange = props.onValueChange;
    Object.keys(props.data).map((child,index) =>{
      child === props.selectedValue && ( selectedIndex = index );
      items.push({value: child, label: props.data[child].name});
    });
    return {
      selectedIndex,
      initSelectedIndex,
      items,
      pickerStyle,
      itemStyle,
      onValueChange
    };
  }

  /**
   * 组件需要渲染前,对手势事件处理进行初始化
   */
  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this)
    });
    this.isMoving = false;
    this.index = this.state.selectedIndex;
  }

  /**
   * 根据移动的距离重新布局
   * @param dy {number} 移动的距离
   * @private
   */
  _move(dy){
    let index = this.index;
    this.moveDy = dy;
    this.state._viewAnimation.setValue(dy);
    this.state._viewHeight.setValue(this.endHeight + dy);
    this.forceUpdate();
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
    this.state._viewAnimation.setValue(0);
    if (diff && !this.isMoving) {
      marginValue = diff * 36;
      this.state._viewHeight.setValue(this.endHeight);
      Animated.parallel([
        Animated.timing(this.state._viewAnimation, {
          toValue: marginValue,
          duration: 800
        }),
        Animated.timing(this.state._viewHeight, {
          toValue: this.endHeight + marginValue,
          duration: 800
        })
        ]).start(() => this._test(index, marginValue));
    } else { return 'you are moving';}
  }

  _test(index, marginValue) {
    this.index = index;
    this.state._viewAnimation.setValue(0);
    this.endHeight = this.endHeight + marginValue;
    this._onValueChange();
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
      return 'you are moving!';
    }

    if (dy > 0) {
      this._move(dy > this.index * 36 ? this.index * 36 : dy);
    } else {
      this._move(dy < (this.index - this.state.items.length + 1) * 36 ? (this.index - this.state.items.length + 1) * 36 : dy);
    }
  }

  /**
   * 处理移动停止(RN自带的函数)
   * @param evt
   * @param gestureState {object}
   * @private
   */
  _handlePanResponderRelease(evt, gestureState){
    let diff;
    let that = this;
    let animatedListen = this.state._viewAnimation.addListener(({value}) => this._checkArrivetheBoundary(value));
    Animated.parallel([
      Animated.decay(this.state._viewAnimation, {
        velocity: gestureState.vy,
        deceleration: 0.99
      }),
      Animated.decay(this.state._viewHeight, {
        velocity: gestureState.vy,
        deceleration: 0.99
      })
      ]).start(({finished}) => this._checkIfAnimaStopNormally(finished, animatedListen));
  }

  _checkIfAnimaStopNormally(value, anima) {
    this.state._viewAnimation.removeListener(anima);
    if (value) {
      this._test2();
    }
  }

  _checkArrivetheBoundary(value) {
    if (value > 0) {
      if (value > this.index * 36) {
        this.state._viewAnimation.stopAnimation(({value}) => console.debug('stop'));
        this.state._viewAnimation.setValue(this.index * 36);
        this._test2();
      }
    } else {
      if (value < (this.index - this.state.items.length + 1) * 36) {
        this.state._viewAnimation.stopAnimation(({value}) => console.debug('stop'));
        this.state._viewAnimation.setValue((this.index - this.state.items.length + 1) * 36);
        this._test2();
      }
    }
  }
  _test2() {
    this.moveDy = this.state._viewAnimation._value;
    this.endHeight = this.state._viewHeight._value;
    diff = Math.abs(this.moveDy) % 36 >= 18 ? Math.ceil(Math.abs(this.moveDy / 36)) : Math.floor(Math.abs(this.moveDy / 36));
    if (this.moveDy >= 0) {this.index = this.index - diff} else {this.index = this.index + diff;}
    this.state._viewHeight.setValue(- 36 * this.index + 72);
    this.state._viewAnimation.setValue(0);
    this.moveDy = 0;
    this.endHeight = this.state._viewHeight._value;
    this._onValueChange();
  }

  _handleStartShouldSetPanResponder(e, gestureState){
    return true;
  }

  _handlePanResponderGrant(){
    this.state._viewAnimation.setValue(0);
    console.debug('Start to move');
  }
  /**
   * 对单轮的每个格子进行初始化
   * @param items {array} 需要渲染的总的数据
   * @returns {{upItems: Array, middleItems: Array, downItems: Array}}
   * @private
   */
  _renderItems(items){
    let upItems = [], middleItems = [], downItems = [];
    let initSelectedIndex = this.state.initSelectedIndex;
    items.forEach((item, index) => {
      let ownHeight = - 36 * this.state.initSelectedIndex + 72;
      // console.debug("ss " + this.state._viewHeight._value + " " + (ownHeight - 36 * (- this.state.initSelectedIndex + index + 2)) + " "
      //   + (ownHeight + (this.state.initSelectedIndex - index) * 36) + " " + (ownHeight + 36 * (2 + this.state.initSelectedIndex - index)) + " "
      //   + this.state.initSelectedIndex);
      middleItems[index] = <Animated.Text
        key={'mid' + index}
        className={'mid' + index}
        onPress={() => {this._moveTo(index)}}

        style={[rollStyles.middleText, this.state.itemStyle,
              { fontSize:
                  this.state._viewHeight.interpolate({
                    inputRange: [ownHeight - 36 * (- this.state.initSelectedIndex + index + 2),
                                 ownHeight + (this.state.initSelectedIndex - index) * 36,
                                 ownHeight + 36 * (2 + this.state.initSelectedIndex - index)],
                    outputRange: [18, 22, 18]}),
                opacity:
                  this.state._viewHeight.interpolate({
                    inputRange: [ownHeight - 36 * (- this.state.initSelectedIndex + index + 2),
                                 ownHeight + (this.state.initSelectedIndex - index) * 36,
                                 ownHeight + 36 * (2 + this.state.initSelectedIndex - index)],
                    outputRange: [0.4, 1.0, 0.4]
                  })
                }]}>{item.label}
      </Animated.Text>;
    });
    return middleItems;
  }

  /**
   * 单轮上的数值变化后
   * @returns {object}
   * @private
   */
  _onValueChange(){
    var curItem = this.state.items[this.index];
    this.setState({selectedIndex:this.index});
    this.state.onValueChange && this.state.onValueChange(curItem.value, this.index);
  }

  /**
   * 渲染函数
   * @returns {XML}
   */
  render(){

    let index = this.state.selectedIndex;


    let middleViewStyle = {
      position: 'absolute',
      top: - 36 * index + 72
    };

    return (
      <View style={[{flex: 1}]}>
      <View style={{position: 'absolute', width: 400, height: 46, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ccc', marginTop: 63}}></View>
      <View style={[rollStyles.container, this.state.pickerStyle]} {...this._panResponder.panHandlers} >
          <Animated.View
            style={[
              rollStyles.middleView,
              middleViewStyle,
              {transform: [{translateY: this.state._viewAnimation}]}
              ]}
           >
            {this._renderItems(this.state.items)}
          </Animated.View>
      </View>
      </View>
        );
  }
}

export default Pickroll;
