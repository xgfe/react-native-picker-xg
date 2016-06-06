import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes}from 'react';
import {
  Animated,
  Platform,
  Dimensions,
  View,
  Modal,
  TextInput,
  Text,
  PickerIOS
} from 'react-native';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Tpicker from '../app/setup3';
import TPickroll from '../app/roll';

let PickRoll = Platform.OS === 'ios' ? PickerIOS : Pickroll;
let PickerItem = PickRoll.Item;
class Item extends Component {
  render() {
    return null;
  }
}
PickerIOS.Item = Item;

describe('DOM TEST', () => {
  it("check the dom", () => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <Tpicker data = {wheel1}/>);
    expect(wrapper.find(Modal)).to.have.length(1);
    expect(wrapper.find(View)).to.have.length(4);
    expect(wrapper.find(TextInput)).to.have.length(1);
    expect(wrapper.find(Text)).to.have.length(2);
  });
});

describe('STATE TEST', () => {
  it("check the state value", () => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <Tpicker data = {wheel1}/>);
    const tpicker = wrapper.instance();
    expect(wrapper.state('selfStyle')).to.equal(undefined);
    expect(wrapper.state('inputStyle')).to.equal(undefined);
    expect(wrapper.state('inputValue')).to.equal('please chose');
    expect(wrapper.state('animationType')).to.equal('none');
    expect(wrapper.state('transparent')).to.equal(true);
    expect(wrapper.state('visible')).to.equal(false);
    expect(wrapper.state('enable')).to.equal(true);
    expect(wrapper.state('selectIndex')).to.eql([0]);
    expect(wrapper.state('confirmBtnText')).to.equal("确定");
    expect(wrapper.state('cancelBtnText')).to.equal("取消");
    expect(wrapper.state('selectedValue')).to.eql(['amc1']);
    const wrapper1 = shallow( <Tpicker data = {wheel1}
                                       inputValue = {"just a test"}
                                       animationType = {'fade'}
                                       transparent = {false}
                                       visible = {true}
                                       enable = {false}
                                       confirmBtnText = {'confirm'}
                                       cancelBtnText = {'cancel'}
                                       selectIndex = {[1]}
                            />);
    expect(wrapper1.state('inputValue')).to.equal('just a test');
    expect(wrapper1.state('animationType')).to.equal('fade');
    expect(wrapper1.state('transparent')).to.equal(false);
    expect(wrapper1.state('visible')).to.equal(true);
    expect(wrapper1.state('enable')).to.equal(false);
    expect(wrapper1.state('selectIndex')).to.eql([1]);
    expect(wrapper1.state('confirmBtnText')).to.equal('confirm');
    expect(wrapper1.state('cancelBtnText')).to.equal('cancel');
  })
})

describe('SET MODAL VISIBLE', () => {
  let wheel1 = [{
    amc1: {
      name: '1月',
    },
    alfa1: {
      name: '2月',
    },
    aston1: {
      name: '3月',
    },
    audi1: {
      name: '4月',
    },
  }];
  const wrapper = shallow( <Tpicker data = {wheel1}/>);

  let height = Dimensions.get('window').height;
  let top = height-250;
  const tpicker = wrapper.instance();

  it("check the _setModalVisible function", () => {
    tpicker._setModalVisible(true,'cancel');
    expect(wrapper.state("visible")).to.equal(true);
    expect(wrapper.state("animatedHeight")._animation._toValue).to.equal(top);

    wrapper.setState({
      animatedHeight: new Animated.Value(top),
    });
    tpicker._setModalVisible(false,'cancel');
    expect(wrapper.state("animatedHeight")._animation._toValue).to.equal(height);
  })
})

describe('SET EVENT BEGIN', () => {
  it("check the _setEventBegin function", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <Tpicker data = {wheel1}/>);
    let tpicker = wrapper.instance();
    const wrapper1 = shallow(<Tpicker
      enable = {false}
      data = {wheel1}
    />)
    let tpicker1 = wrapper1.instance();
    tpicker.refs = {
      test: {
        blur: () => {}
      }
    };
    tpicker._setModalVisible = spy;
    tpicker._setEventBegin();
    expect(tpicker._setModalVisible.calledWith(true)).to.equal(true);
    let returnValue = tpicker._setEventBegin();
    expect(returnValue['valueCount']).to.eql(wrapper.state("selectedValue"));
    expect(returnValue['indexCount']).to.eql(wrapper.state("selectIndex"));
    let returnValue1 = tpicker1._setEventBegin();
    tpicker1._setEventBegin();
    expect(returnValue1).to.equal("it's disabled");
  })
})

describe("CHANGE ANIMATE STATUS", () => {
  it("check the _changeAnimateStatus function", () => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <Tpicker data = {wheel1}/>);
    let tpicker = wrapper.instance();
    tpicker._changeAnimateStatus("confirm");
    expect(wrapper.state('visible')).to.equal(false);
    wrapper.setState({
      visible: true,
    });
    tpicker._changeAnimateStatus("confirmmm");
    expect(wrapper.state('visible')).to.equal(true);
    wrapper.setState({
      visible: true,
    });
    let returnValue = tpicker._changeAnimateStatus("cancel");
    tpicker._changeAnimateStatus("cancel");
    expect(wrapper.state('visible')).to.equal(false);
    expect(returnValue.indexCount).to.eql(wrapper.state('selectIndex'));
    expect(returnValue.valueCount).to.eql(wrapper.state('selectedValue'));
    let spy = sinon.spy();
    const wrapper1 = shallow( <Tpicker data = {wheel1} onResult={spy}/>);
    let tpicker1 = wrapper1.instance();
    tpicker1._changeAnimateStatus('confirm');
    expect(spy.callCount).to.equal(1);
  })
})

describe("CONFIRM CHOSE", () => {
  it("check the confirmChose function", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <Tpicker data = {wheel1} selectedValue={'amc1'}/>);
    let tpicker = wrapper.instance();
    let str = tpicker._confirmChose();
    tpicker._setModalVisible = spy;
    tpicker._confirmChose();
    expect(tpicker._setModalVisible.calledWith(false,'confirm')).to.equal(true);
    expect(str).to.equal("1月");
  })
})

describe("STATE FROM PROPS ROLL", () => {
  it("check the stateFromProps function", () => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    let props = {
      selectedIndex: 0,
      data:wheel1[0],
    };
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    let returnValue = pickRoll._stateFromProps(props);
    expect(returnValue.selectedIndex).to.equal(0);
    expect(returnValue.items).to.have.length(4);
    expect(returnValue.pickerStyle).to.equal(undefined);
    expect(returnValue.itemStyle).to.equal(undefined);
  })
})

describe("MOVE ROLL", () => {
  it("check the move function", () => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    let props = {
      selectedIndex: 0,
      data:wheel1[0],
    };
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll.index = 0;
    pickRoll._move(10);
    expect(pickRoll.middleHeight).to.equal(10);
  })
})

describe("MOVETO", () => {
  it("check the moveTo function", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll._move = spy;
    pickRoll.index = 1;
    pickRoll.isMoving = false;
    pickRoll._moveTo(0);
    expect(pickRoll._move.calledWith(40)).to.equal(true);
    expect(pickRoll.index).to.equal(0);
    pickRoll.isMoving = true;
    pickRoll._moveTo(0);
    let returnValue = pickRoll._moveTo(0);
    expect(returnValue).to.equal("you are moving");
  })
})
describe("HANDLEPAN RESPONDER", () => {
  it("check the handlePanResponderMove", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll._move = spy;
    pickRoll.index = 1;
    pickRoll.isMoving = false;
    pickRoll._handlePanResponderMove({},{dy:10});
    expect(pickRoll._move.calledWith(10)).to.equal(true);
    pickRoll._handlePanResponderMove({},{dy:-10});
    expect(pickRoll._move.calledWith(10)).to.equal(true);
    pickRoll.index = 0;
    pickRoll._handlePanResponderMove({},{dy:10});
    expect(pickRoll._move.calledWith(0)).to.equal(true);
    pickRoll.isMoving = true;
    let returnValue = pickRoll._handlePanResponderMove({},{dy:10});
    pickRoll._handlePanResponderMove({},{dy:10});
    expect(returnValue).to.equal("you are moving");
  })
})

describe("HANDLEPAN RESPONDERRELEASE", () => {
  it("check the handlePanResponderRelease", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll.middleHeight = 62;
    pickRoll._move = spy;
    pickRoll._handlePanResponderRelease();
    expect(pickRoll._move.calledWith(0)).to.equal(true);
    expect(pickRoll.index).to.equal(2);
  })
})

describe("RENDERITEMS", () => {
  it("check the renderItems function",() => {
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
    }];
    let props = {
      items:[{value:'amc1',label:'1月'},{value:'alfa1',label:'2月'}]
    }
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll._renderItems(props.items);
    expect(wrapper.find(Text)).to.have.length(6);
  })
})


describe("EVENT TEST", () => {
  it("checkt the setup3 dom-like event", () => {
    let spy = sinon.spy();
    let spy1 = sinon.spy();
    let spy2 = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];

    const wrapper = shallow( <Tpicker data = {wheel1} selectIndex={[0]}/>);
    let tpicker = wrapper.instance();
    tpicker._setEventBegin = spy;
    tpicker._confirmChose = spy1;
    tpicker._setModalVisible = spy2;
    wrapper.find('TextInput').simulate('focus');
    expect(tpicker._setEventBegin.calledOnce).to.equal(true);
    wrapper.find('.confirm').simulate('press');
    expect(tpicker._confirmChose.calledOnce).to.equal(true);
    wrapper.find('.cancel').simulate('press');
    expect(tpicker._setModalVisible.calledOnce).to.equal(true);
    wrapper.find(Modal).simulate('RequestClose');
    expect(tpicker._setModalVisible.callCount).to.equal(2);
    expect(wrapper.find(PickRoll).find(".test0")).to.have.length(1);
    wrapper.find(PickRoll).find(".test0").props().onValueChange("alfa1",1);
    expect(wrapper.state("selectIndex")).to.eql([1]);
    expect(wrapper.state("selectedValue")).to.eql(["alfa1"]);
  })

  it("check the roll dom-like event", () => {
    let spy = sinon.spy();
    let wheel1 = [{
      amc1: {
        name: '1月',
      },
      alfa1: {
        name: '2月',
      },
      aston1: {
        name: '3月',
      },
      audi1: {
        name: '4月',
      },
    }];
    const wrapper = shallow( <TPickroll data = {wheel1[0]} selectIndex={0}/>);
    let pickRoll = wrapper.instance();
    pickRoll._moveTo = spy;
    wrapper.find(Text).find(".up1").simulate('press');
    expect(pickRoll._moveTo.calledOnce).to.equal(true);
    wrapper.find(Text).find(".down1").simulate('press');
    expect(pickRoll._moveTo.callCount).to.equal(2);
  })
})


