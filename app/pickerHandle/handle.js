/**
 * 依赖引用
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Animated,
    Platform,
    PickerIOS,
    StatusBar,
    Modal,
    Image,
} from 'react-native';
import styles from './handleStyle';


/**
 * 全局变量声明
 */
let height = Dimensions.get('window').height;

/**
 * 组件扩展
 */
class Handle extends Component {

  /**
   * 类型约束
   * @type {{data: Requireable<any>, visible: Requireable<any>, transparent: Requireable<any>, animationType: Requireable<any>, enable: Requireable<any>, inputValue: Requireable<any>}}
     */
  static propTypes = {
    //传递的数据
    data: PropTypes.array
  };

  /**
   * 构造函数
   * @param props {object} 继承的属性
   * @param context 上下文
     */
  constructor(props, context){
    super(props, context);

  }


  /**
   * 渲染函数
   * @returns {XML}
     */
  render(){
    return (
          <View style={[styles.nav, this.props.navStyle]}>
            <TouchableOpacity  style={styles.confirm} onPress={() => {this.props.confirmChose();}}>
              <Text className={'confirm'}
                    style={[styles.confirmBtnStyle,this.props.confirmBtnStyle]} >{this.props.confirmBtnText}</Text>
            </TouchableOpacity>
            <View style={styles.pickerNameContainer}>
              <Text style={[styles.pickerName,this.props.pickerNameStyle]}>{this.props.pickerName}</Text>
            </View>
            <TouchableOpacity style={styles.cancel} onPress={() => {this.props.cancelChose(false, 'cancel');
            }}>
              <Text
                className={'cancel'}
                style={[styles.cancelBtnStyle,this.props.cancelBtnStyle]}
              >{this.props.cancelBtnText}</Text>
            </TouchableOpacity>
          </View>
    );
  }}

export default Handle;
