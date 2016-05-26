import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PropTypes,
    Dimensions,
    PixelRatio,
    PanResponder,
    TouchableOpacity,
    TextInput,
    Animated,
    Modal
} from 'react-native';



class CPickroll extends Component {

    static propTypes = {
        inputValue: PropTypes.string || PropTypes.number,
        visible: PropTypes.bool,
        inputStyle: PropTypes.any,
        onValueChange: PropTypes.func,
        selectedValue: PropTypes.any
    };

    constructor(props, context){
        super(props, context);
        this.state = this._stateFromProps(props);
    }

    componentWillReceiveProps(newProps){
        if(newProps.getValue!==this.props.getValue&&newProps.getValue===true){
            this.index = this.state.selectedIndex;
            this.props.handleValue(this.state.items[this.index].label,this.index);
        }
        this.setState(this._stateFromProps(newProps));
    }

    _stateFromProps(props){
        let selectedIndex = props.selectIndex;
        let items = [];
        let pickerStyle = props.pickerStyle;
        let itemStyle = props.itemStyle;
        let onValueChange = props.onValueChange;
        props.data.map((child,index) =>{
            child === props.selectedValue && ( selectedIndex = index );
            items.push({value: child, label: child});
        })
        return {
            selectedIndex,
            items,
            pickerStyle,
            itemStyle,
            onValueChange,
        };
    }

    _move(dy){
        let index = this.index;
        this.middleHeight = Math.abs(-index * 40 + dy);
        this.up && this.up.setNativeProps({
            style: {
                marginTop: (3 - index) * 30 + dy * .75,
            },
        });
        this.middle && this.middle.setNativeProps({
            style: {
                marginTop: -index * 40 + dy,
            },
        });
        this.down && this.down.setNativeProps({
            style: {
                marginTop: (-index - 1) * 30 + dy * .75,
            },
        });
    }

    _moveTo(index){
        let _index = this.index;
        let diff = _index - index;
        let marginValue;
        let that = this;
        if(diff && !this.isMoving) {
            marginValue = diff * 40;
            this._move(marginValue);
            this.index = index;
            this._onValueChange();
        }
    }

    _handlePanResponderMove(evt, gestureState){
        let dy = gestureState.dy;
        if(this.isMoving) {
            return;
        }
        // turn down
        if(dy > 0) {
            this._move(dy > this.index * 40 ? this.index * 40 : dy);
        }else{
            this._move(dy < (this.index - this.state.items.length + 1) * 40 ? (this.index - this.state.items.length + 1) * 40 : dy);
        }
    }

    _handlePanResponderRelease(evt, gestureState){
        let middleHeight = this.middleHeight;
        this.index = middleHeight % 40 >= 20 ? Math.ceil(middleHeight / 40) : Math.floor(middleHeight / 40);
        this._move(0);
        this._onValueChange();
    }

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


    _renderItems(items){
        let upItems = [], middleItems = [], downItems = [];
        items.forEach((item, index) => {

            upItems[index] = <Text
                key={'up'+index}
                style={[styles.upText, this.state.itemStyle]}
                onPress={() => {
									this._moveTo(index);
								}} >
                {item.label}
            </Text>;

            middleItems[index] = <Text
                key={'mid'+index}
                style={[styles.middleText, this.state.itemStyle]}>{item.label}
            </Text>;

            downItems[index] = <Text
                key={'down'+index}
                style={[styles.downText, this.state.itemStyle]}
                onPress={() => {
										this._moveTo(index);
									}} >
                {item.label}
            </Text>;

        });
        return { upItems, middleItems, downItems, };
    }

    _onValueChange(){
        var curItem = this.state.items[this.index];
        // this.setState({selectedIndex:this.index});
        this.state.onValueChange && this.state.onValueChange(curItem.value, this.props.pickIndex);
    }

    render(){
        let index = this.state.selectedIndex;
        let length = this.state.items.length;
        let items = this._renderItems(this.state.items);

        let upViewStyle = {
            marginTop: (3 - index) * 30,
            height: length * 30,
        };
        let middleViewStyle = {
            marginTop:  -index * 40,
        };
        let downViewStyle = {
            marginTop: (-index - 1) * 30,
            height:  length * 30,
        };

        return (

            <View style={[styles.container, this.state.pickerStyle]} {...this._panResponder.panHandlers}>

                <View style={styles.up}>
                    <View style={[styles.upView, upViewStyle]} ref={(up) => { this.up = up }} >
                        { items.upItems }
                    </View>
                </View>

                <View style={styles.middle}>
                    <View style={[styles.middleView, middleViewStyle]} ref={(middle) => { this.middle = middle }} >
                        { items.middleItems }
                    </View>
                </View>

                <View style={styles.down}>
                    <View style={[styles.downView, downViewStyle]} ref={(down) => { this.down = down }} >
                        { items.downItems }
                    </View>
                </View>
            </View>


        );
    }
}

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
let top = height - 250;
let ratio = PixelRatio.get();

let styles = StyleSheet.create({

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    up: {
        height: 90,
        overflow: 'hidden',
        alignSelf:'stretch',
    },
    upView: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    upText: {
        paddingTop: 0,
        height: 30,
        fontSize: 20,
        color: '#000',
        opacity: .5,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
    },
    middle: {
        alignSelf:'stretch',
        height: 40,
        overflow: 'hidden',
        borderColor: '#aaa',
        borderTopWidth: 1/ratio,
        borderBottomWidth: 1/ratio,
    },
    middleView: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    middleText: {
        paddingTop: 0,
        height: 40,
        color: '#000',
        fontSize: 28,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
    },
    down: {
        height: 90,
        overflow: 'hidden',
        alignSelf:'stretch',
    },
    downView: {
        overflow: 'hidden',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    downText: {
        paddingTop: 0,
        height: 30,
        fontSize: 16,
        color: '#000',
        opacity: .5,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
    }

});



export default CPickroll;
