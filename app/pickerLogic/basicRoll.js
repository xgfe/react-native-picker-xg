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
    data: PropTypes.object,
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
    let itemStyle = props.itemStyle;
    let onValueChange = props.onValueChange;
    Object.keys(props.data).map((child,index) =>{
      child === props.selectedValue && (selectedIndex = index);
      items.push({value: child, label: props.data[child].name});
    });
    this.moveDy = 0;
    this.fingerLeft = false;
    return {
      selectedIndex,
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
    this.initIndex = this.state.selectedIndex + 2;
    this.index =  2;
  }



  componentDidMount() {
    setTimeout(() => {
      this._moveTo(this.initIndex);
      this._onValueChange();
    }, 0)
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
    } else { return}
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
      middleItems[index + 2] = <Animated.Text
        key={'mid' + (index + 2)}
        className={'mid' + (index + 2)}
        onPress={() => {this._moveTo(index + 2)}}
        style={[rollStyles.middleText, this.state.itemStyle,
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
      </Animated.Text>;
    });

    // todo 优化
    middleItems[0] = <Text
        key={'mid' + 0}
        className={'mid' + 0}
        style={[rollStyles.middleText, this.state.itemStyle]}>
      </Text>;

    middleItems[1] = <Text
        key={'mid' + 1}
        className={'mid' + 1}
        style={[rollStyles.middleText, this.state.itemStyle]}>
      </Text>;

    middleItems[items.length + 2] = <Text
        key={'mid' + items.length + 2}
        className={'mid' + items.length + 2}
        style={[rollStyles.middleText, this.state.itemStyle]}>
      </Text>;

    middleItems[items.length + 1 + 2] = <Text
        key={'mid' + items.length + 1 + 2}
        className={'mid' + items.length + 1 + 2}
        style={[rollStyles.middleText, this.state.itemStyle]}>
      </Text>;
    return middleItems;
  }

  /**
   * 单轮上的数值变化后
   * @returns {object}
   * @private
   */
  _onValueChange(){
    console.debug(this.index);
    console.debug(this.state.items[this.index - 2]);
    var curItem = this.state.items[this.index - 2];
    this.state.onValueChange && this.state.onValueChange(curItem.value, this.index - 2);
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
    }, 0)
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


  /**
   * 渲染函数
   * @returns {XML}
   */
  render(){
    let index = this.state.selectedIndex;
    let length = this.state.items.length;

    return (
      <View style={{flex: 1}}>
      <ScrollView
        ref='_scrollView'
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollBegin={(event) => {this._detectScrollBegin(event);}}
        onMomentumScrollEnd={(event) => {this._detectScrollEnd(event);}}
        pagingEnabled
        onScrollEndDrag={(event) => {this._detectEnd(event);}}
        onScroll={(event) => {this.moveDy = event.nativeEvent.contentOffset.y; this.forceUpdate();}}>
        <View style={[rollStyles.middleView]}>
          {this._renderItems(this.state.items)}
        </View>
      </ScrollView>
      {/*这个要处理下，要不下面的响应被遮盖了*/}
      <View style={{position: 'absolute', width: 400, height: 36, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#ccc', marginTop: 75}}></View>
      </View>
        );
  }
}

export default Pickroll;
