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
    Animated
} from 'react-native';



class TPicker extends Component {

    static propTypes = {
        pickerStyle: PropTypes.any,
        itemStyle: PropTypes.any,
        onValueChange: PropTypes.func,
        selectedValue: PropTypes.any
    };

    constructor(props, context){
        super(props, context);
        this.pickerShow = this.pickerShow.bind(this);
        this.renderMask = this.renderMask.bind(this);
        this.resetMask = this.resetMask.bind(this);
        this.pickerHidden = this.pickerHidden.bind(this);
        this.confirmChose = this.confirmChose.bind(this);
        this.state = this._stateFromProps(props);
        this.state.mask = false;
        this.state.text = 'chose the item below'
    }



    _stateFromProps(props){
        let selectedIndex = 0;
        let items = [];
        let pickerStyle = props.pickerStyle;
        let itemStyle = props.itemStyle;
        let onValueChange = props.onValueChange;
        let fadeAnim = new Animated.Value(height);
        React.Children.forEach(props.children, (child, index) => {
            child.props.value === props.selectedValue && ( selectedIndex = index );
            items.push({value: child.props.value, label: child.props.label});
        });
        return {
            selectedIndex,
            items,
            pickerStyle,
            itemStyle,
            onValueChange,
            fadeAnim
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
        this.state.onValueChange && this.state.onValueChange(curItem.value, curItem.label);
    }

    pickerShow(){
        this.setState({mask: true});
        if (this.myTextInput !== null) {
            this.myTextInput.blur();
        }
        Animated.timing(
            this.state.fadeAnim,
            {toValue: top}
        ).start();
    }
    pickerHidden(){
        Animated.timing(
            this.state.fadeAnim,
            {toValue: height}
        ).start();
        this.setState({mask: false});
    }
    resetMask(){
        this.pickerHidden();
    }
    renderMask(statue){
        if(statue){
            return( <View
                style = {{opacity:0.5,backgroundColor:'black',flex:1,alignItems:'center',justifyContent:'center',width:width}}
                ></View>
            ) }
        else{
            return;
        }
    }
    confirmChose(){
        this.resetMask();
        this.setState({text: (this.state.items[this.index]).label});
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
            <View
            style={{flex:1,alignItems:'center',justifyContent:'center',width:width}}>
        <TextInput
            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:50,position:'absolute',top:10}}
            onFocus={this.pickerShow}
            value={this.state.text}
            ref={(ref) => {this.myTextInput = ref}}
        />
                {this.renderMask(this.state.mask)}
            <Animated.View style={[styles.container, this.state.pickerStyle, {top:this.state.fadeAnim}]} {...this._panResponder.panHandlers}>
                <  View style={styles.nav}>
                    <TouchableOpacity onPress={this.confirmChose}>
                    <Text style={styles.confirm}>Confirm</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={this.resetMask}>
                    <Text style={styles.cancel} >Cancel</Text>
                        </TouchableOpacity>
                </View>
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
            </Animated.View>

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
        position: 'absolute',
        top: top,
        justifyContent: 'center',
        alignItems: 'center',
        //this is very important
        backgroundColor: 'white',
    },
    nav: {
        paddingLeft:10,
        paddingRight:10,
        width: width,
        flex: 1,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between'
    },
    confirm: {
        alignSelf: 'center',
    },
    cancel: {
        alignSelf: 'center',
    },
    up: {
        height: 90,
        overflow: 'hidden'
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
        height: 40,
        width: width,
        overflow: 'hidden',
        borderColor: '#aaa',
        borderTopWidth: 1/ratio,
        borderBottomWidth: 1/ratio
    },
    middleView: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        overflow: 'hidden'
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

export default TPicker;
