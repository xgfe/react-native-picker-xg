import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions,
    StatusBar
} from 'react-native';
import {rollStyles} from './style';

class Pickroll extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this._stateFromProps(props);
    this.initOriginVariable();
  }

  componentWillReceiveProps(newProps){
      this.setState(this._stateFromProps(newProps));
      this.initOriginVariable();
    }

    _stateFromProps(props){
      // 选择的滚轮列
      let selectedIndex = this.props.selectIndex;
      // 初始化时选择的滚轮列
      let initSelectedIndex = this.props.selectIndex;
      // 所有的滚轮列数据
      let items = [];
      let pickerStyle = props.pickerStyle;
      let itemStyle = props.itemStyle;
      let onValueChange = props.onValueChange;
      Object.keys(props.data).map((child,index) =>{
        // 根据传入的初始选择值确定选择的滚轮列
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

    initOriginVariable() {
      //
      this.endHeight = - 36 * this.state.initSelectedIndex + 72;
      this.scrollAnima = null;
      this.basicAnima = null;
      //相对高度
      this.state._viewAnimation = new Animated.Value(0);
      //绝对高度
      this.state._viewHeight = new Animated.Value(- 36 * this.state.initSelectedIndex + 72);
      this.index = this.state.selectedIndex;
    }

    componentWillMount(){
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
        onMoveShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
        onPanResponderGrant: this._handlePanResponderGrant.bind(this),
        onPanResponderRelease: this._handlePanResponderRelease.bind(this),
        onPanResponderMove: this._handlePanResponderMove.bind(this)
      });
    }

    _handleStartShouldSetPanResponder(e, gestureState){
      return true;
    }

    _handlePanResponderGrant(){
      console.debug('Start to move');
    }

    _handlePanResponderMove(evt, gestureState){
      let dy = gestureState.dy;
      // if (dy > 0) {
      //   this._move(dy > this.index * 36 ? this.index * 36 : dy);
      // } else {
      //   this._move(dy < (this.index - this.state.items.length + 1) * 36 ? (this.index - this.state.items.length + 1) * 36 : dy);
      // }
      this._move(dy);
    }

    _move(dy){
      this.state._viewHeight.setValue(this.endHeight + dy);
    }

    _handlePanResponderRelease(evt, gestureState){
      console.log(Dimensions.get('window').height + " " + StatusBar.currentHeight);
      console.log(gestureState);
    }

    _renderItems(items){
      let middleItems = [];
      let initSelectedIndex = this.state.initSelectedIndex;
      items.forEach((item, index) => {
        let ownHeight = - 36 * this.state.initSelectedIndex + 72;
        middleItems[index] = <Animated.Text
          key={'mid' + index}
          className={'mid' + index}
          // onPress={() => {console.debug('press '+index); this._moveTo(index)}}
          style={[rollStyles.middleText, this.state.itemStyle,
                // { fontSize:
                //     this.state._viewHeight.interpolate({
                //       inputRange: [ownHeight - 36 * (- this.state.initSelectedIndex + index + 2),
                //                    ownHeight + (this.state.initSelectedIndex - index) * 36,
                //                    ownHeight + 36 * (2 + this.state.initSelectedIndex - index)],
                //       outputRange: [20, 22, 20]}),
                //   opacity:
                //     this.state._viewHeight.interpolate({
                //       inputRange: [ownHeight - 36 * (- this.state.initSelectedIndex + index + 2),
                //                    ownHeight + (this.state.initSelectedIndex - index) * 36,
                //                    ownHeight + 36 * (2 + this.state.initSelectedIndex - index)],
                //       outputRange: [0.4, 1.0, 0.4]
                //     })
                //   }
                  ]}>{item.label}
        </Animated.Text>;
      });
      return middleItems;
    }


    render() {
      let index = this.state.selectedIndex;

      return (
        <View style={[{flex: 1}]}>
        <View style={[rollStyles.container, this.state.pickerStyle]} {...this._panResponder.panHandlers} >
            <Animated.View
              style={[
                rollStyles.middleView,
                {transform: [{translateY: this.state._viewHeight}]}
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
