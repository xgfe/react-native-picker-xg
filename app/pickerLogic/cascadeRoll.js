/**
 * 依赖引入
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    Animated,
    ScrollView
} from 'react-native';
import {rollStyles} from './pickerStyle';

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
    data: PropTypes.array,
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
    this.data = [];

    this._dataHandle = this._dataHandle.bind(this);
  }


  _compareArray(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
      return array1 === array2;
    }

    if (array1.length === 0 && array2.length === 0) {
      return true;
    }
    // 并非好的处理方式，但比较简单，todo优化
    return JSON.stringify(array1) === JSON.stringify(array2);
  }
  /**
   * 根据移动到的位置计算移动的距离
   * @param index {number} 移动到的位置
   * @returns {string}
   * @private
   */
  _moveTo(index){
    let _index = this.index;
    let diff = index - _index;
    let marginValue;
    if (diff) {
      marginValue = diff * 36;
      this.index = index;
      this.moveDy = this.moveDy + marginValue;
      this.refs._scrollView.scrollTo({y: this.moveDy});
      this._onValueChange();
    } else { return;}
  }

  /**
   * 对单轮的每个格子进行初始化
   * @param items {array} 需要渲染的总的数据
   * @returns {{upItems: Array, middleItems: Array, downItems: Array}}
   * @private
   */
  _renderItems(items){
    let middleItems = [];
    let total = new Animated.Value(this.moveDy);
    items.forEach((item, index) => {
      middleItems[index + 2] = <View style={rollStyles.textContainer} key={'mid' + (index + 2)}><Animated.Text
        className={'mid' + (index + 2)}
        onPress={() => {this._moveTo(index + 2);}}
        numberOfLines={1}
        style={[rollStyles.middleText, this.props.itemStyle,
          {
                          // todo: when add fontSize, the shaking is too obvious
                          // fontSize:
                          //   total.interpolate({
                          //     inputRange: [(index - 2) * 36, index * 36, (index + 2) * 36],
                          //     outputRange: [20, 22, 20]}),
            opacity:
                            total.interpolate({
                              inputRange: [(index - 2) * 36, index * 36, (index + 2) * 36],
                              outputRange: [0.4, 1.0, 0.4]})
          }
        ]}>{item.label}
      </Animated.Text></View>;
    });

    let aroundItemArray = [0, 1, items.length + 2, items.length + 1 + 2];
    aroundItemArray.forEach((item, index) => {
      middleItems[item] = <View style={rollStyles.textContainer} key={'mid' + item}><Text
        className={'mid' + item}
        style={[rollStyles.middleText, this.props.itemStyle]} /></View>;
    });

    return middleItems;
  }

  /**
   * 单轮上的数值变化后
   * @returns {object}
   * @private
   */
  _onValueChange(){
    let curItem = this.items[this.index - 2];
    this.props.onValueChange && this.props.onValueChange(curItem, this.index - 2, this.props.wheelNumber);
  }

  /**
   * 计算滚动的偏移量
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  _calculateItemroll(type) {
    let diff;
    if (this.moveDy % 36 > 18) {
      diff = Math.ceil(this.moveDy / 36);
      this.moveDy =  diff * 36;
    } else {
      diff = Math.floor(this.moveDy / 36);
      this.moveDy =  diff * 36;
    }
    this.refs._scrollView.scrollTo({x: 0, y: this.moveDy, animated: true});
    this.index = 2 + diff;
    this._onValueChange();
  }

  /**
   * 判断手指离开,手动变为异步
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  _detectEnd(event) {
    this.moveDy = event.nativeEvent.contentOffset.y;
    setTimeout(() => {
      if (!this.fingerLeft) {
        this._calculateItemroll('end');
      }
    }, 0);
  }

  _detectScrollBegin(event) {
    this.fingerLeft = true;
  }
  /**
   * 如果手指离开后还有滑动，则在滑动后触发
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  _detectScrollEnd(event) {
    this.fingerLeft = false;
    this.moveDy = event.nativeEvent.contentOffset.y;
    this._calculateItemroll('scroll');
  }


  _dataHandle() {
    this.items = [];
    if (!this._compareArray(this.data, this.props.data)) {
      this.fingerLeft = false;
      this.moveDy = this.props.selectedIndex * 36;
      this.index =  this.props.selectedIndex + 2;
      setTimeout(() => {
        this.refs._scrollView.scrollTo({y: this.moveDy});
      },0);
    }
    this.data = this.props.data.slice();
    this.props.data.map((child,index) =>{
      this.items.push({value: child[this.props.id], label: child[this.props.name], parentId: child[this.props.parentId]});
    });
  }
  /**
   * 渲染函数
   * @returns {XML}
   */
  render(){

    this._dataHandle();
    return (
      <View style={{flex: 1}}>
      <View style={{position: 'absolute', width: 400, height: 36, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ccc', marginTop: 75}} />
      <ScrollView
        ref="_scrollView"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={(event) => {this._detectScrollBegin(event);}}
        onMomentumScrollEnd={(event) => {this._detectScrollEnd(event);}}
        pagingEnabled
        onScrollEndDrag={(event) => {this._detectEnd(event);}}
        onScroll={(event) => {this.moveDy = event.nativeEvent.contentOffset.y; this.forceUpdate();}}>
        <View style={[rollStyles.middleView]}>
          {this._renderItems(this.items)}
        </View>
      </ScrollView>
      </View>
    );
  }
}

Pickroll.defaultProps = {
  selectedIndex: 0
};
export default Pickroll;
