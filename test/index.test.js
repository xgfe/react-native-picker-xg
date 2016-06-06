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
import {shallow,mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Cpicker from '../app/csetup';
import CPickroll from '../app/roll2';

let CPicker = Platform.OS === 'ios' ? PickerIOS : CPickroll;
let PickerItem = CPicker.Item;
class Item extends Component {
  render() {
    return null;
  }
}
PickerIOS.Item = Item;
describe('DOM TEST', () => {
  it("check the dom", () => {
    const wrapper = shallow( <Cpicker/>);
    expect(wrapper.find(Modal)).to.have.length(1);
    expect(wrapper.find(View)).to.have.length(4);
    expect(wrapper.find(TextInput)).to.have.length(1);
    expect(wrapper.find(Text)).to.have.length(2);
  });
});

describe('STATE TEST', () => {
  let level2Data = {
    "四川":["w","e","q"],
    "浙江":["ww","ee","qq"],
  }
  const wrapper = shallow(<Cpicker
    level = {2}
    selectIndex = {[0,1]}
    data = {level2Data}
  /> );

  it("check the state value", () => {
    expect(wrapper.state('inputValue')).to.equal('please chose');
    expect(wrapper.state('animationType')).to.equal('none');
    expect(wrapper.state('transparent')).to.equal(true);
    expect(wrapper.state('visible')).to.equal(false);
    expect(wrapper.state('enable')).to.equal(true);
    expect(wrapper.state('selectIndex')).to.eql([0,1]);

  })
})

describe('SET MODAL VISIBLE', () => {
  it("check the _setModalVisible function", () => {
    const wrapper = shallow(<Cpicker/> );

    let height = Dimensions.get('window').height;
    let top = height-250;
    const cpicker = wrapper.instance();
    cpicker._setModalVisible(true,'cancel');
    expect(wrapper.state("visible")).to.equal(true);
    expect(wrapper.state("animatedHeight")._animation._toValue).to.equal(top);

    wrapper.setState({
      animatedHeight: new Animated.Value(top),
    });
    cpicker._setModalVisible(false,'cancel');
    expect(wrapper.state("animatedHeight")._animation._toValue).to.equal(height);
  })
})

describe('SET EVENT BEGIN', () => {
  it("check the _setEventBegin function", () => {
    let spy = sinon.spy();
    let spy1 = sinon.spy();
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq"],
    }
    const wrapper = shallow(<Cpicker
      level = {2}
      selectIndex = {[0,1]}
      data = {level2Data}
    /> );
    const wrapper1 = shallow(<Cpicker
      enable = {false}
      level = {2}
      selectIndex = {[0,1]}
      data = {level2Data}
    />)
    let cpicker = wrapper.instance();
    cpicker.refs = {
      test: {
        blur: () => {}
      }
    };
    cpicker._setModalVisible = spy;
    cpicker._setEventBegin();
    expect(cpicker._setModalVisible.calledWith(true)).to.equal(true);
    let returnValue = cpicker._setEventBegin();
    expect(returnValue['saveChoseValue']).to.eql(wrapper.state("selectedValue"));
    expect(returnValue['saveData']).to.eql(wrapper.state("passData"));
    expect(returnValue['saveIndex']).to.eql(wrapper.state("selectIndex"));
    let cpicker1 = wrapper1.instance();
    cpicker1._setModalVisible = spy1;
    cpicker1._setEventBegin();
    expect(cpicker1._setModalVisible.callCount).to.equal(0);
  })
})

describe("CHANGE ANIMATE STATUS", () => {
  it("check the _changeAnimateStatus function", () => {
    const wrapper = shallow(<Cpicker/> );
    let cpicker = wrapper.instance();
    cpicker._changeAnimateStatus("confirm");
    expect(wrapper.state('visible')).to.equal(false);
    wrapper.setState({
      visible: true,
    });
    cpicker._changeAnimateStatus("confirmmm");
    expect(wrapper.state('visible')).to.equal(true);
    wrapper.setState({
      visible: true,
    });
    cpicker._changeAnimateStatus("cancel");
    expect(wrapper.state('visible')).to.equal(false);
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq"],
    }
    let spy = sinon.spy();
    const wrapper1 = mount(<Cpicker
      level = {2}
      selectIndex = {[0,1]}
      data = {level2Data}
      onResult = {() => {}}
    /> );
    let cpicker1 = wrapper1.instance();
    wrapper1.setProps({ onResult: spy });
    cpicker1._changeAnimateStatus('confirm');
    expect(spy.callCount).to.equal(1);
  })
})

describe("CONFIRM CHOSE", () => {
  it("check the confirmChose function", () => {
    let spy = sinon.spy();
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq"],
    }
    const wrapper = shallow(<Cpicker
      level = {2}
      selectIndex = {[0,1]}
      data = {level2Data}
    /> );
    let cpicker = wrapper.instance();
    let str = cpicker._confirmChose();
    cpicker._setModalVisible = spy;
    cpicker._confirmChose();
    expect(wrapper.state('inputValue')).to.equal(str);
    expect(cpicker._setModalVisible.calledWith(false)).to.equal(true);
    expect(wrapper.state('visible')).to.equal(false);
  })
})

describe("CANCEL CHOSE", () => {
  it("check the cancelchose function", () => {
    let spy = sinon.spy();
    const wrapper = shallow(<Cpicker />);
    let cpicker = wrapper.instance();
    let returnValue = cpicker._cancelChose();
    cpicker._setModalVisible = spy;
    cpicker._cancelChose();
    expect(cpicker._setModalVisible.calledWith(false)).to.equal(true);
    expect(returnValue['saveChoseValue']).to.eql(wrapper.state("selectedValue"));
    expect(returnValue['saveData']).to.eql(wrapper.state("passData"));
    expect(returnValue['saveIndex']).to.eql(wrapper.state("selectIndex"));
  })
})

describe("STATE FROM PROPS", () => {
  it("check the stateFromProps function", () => {
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq"],
    }
    const wrapper = shallow(<Cpicker/>)
    let props = {
      data: level2Data,
      level: 2,
    }
    let cpicker = wrapper.instance();
    let returnValue = cpicker._stateFromProps(props);
    cpicker._stateFromProps(props);
    expect(returnValue.selectIndex).to.eql([0,0]);
    expect(returnValue.selectedValue).to.eql(['四川','w']);
    expect(returnValue.selfStyle).to.equal(undefined);
    expect(returnValue.visible).to.equal(false);
    expect(returnValue.transparent).to.equal(true);
    expect(returnValue.animationType).to.equal('none');
    expect(returnValue.enable).to.equal(true);
    expect(returnValue.inputValue).to.equal('please chose');
    expect(returnValue.passData).to.eql([ [ '四川', '浙江' ], [ 'w', 'e', 'q' ] ]);
    const wrapper1 = shallow(<Cpicker/>)
    let props1 = {
      data: level2Data,
      level: 1,
      selectIndex: [1,2],
      animationType: 'fade',
      transparent: false,
      visible: true,
      enable: false,
      inputValue: 'just a test',
    }
    let cpicker1 = wrapper1.instance();
    let returnValue1 = cpicker1._stateFromProps(props1);
    expect(returnValue1.selectIndex).to.eql([1,2]);
    expect(returnValue1.visible).to.equal(true);
    expect(returnValue1.transparent).to.equal(false);
    expect(returnValue1.animationType).to.equal('fade');
    expect(returnValue1.enable).to.equal(false);
    expect(returnValue1.inputValue).to.equal('just a test');
  })
})

describe("CHANGE LAYOUT", () => {
  it("check the changeLayout function",() => {
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq"],
    }
    const wrapper = shallow(<Cpicker
    data={level2Data}
    level={2}/>)
    let cpicker = wrapper.instance();
    cpicker._changeLayout("浙江",0);
    expect(wrapper.state('passData')).to.eql([['四川','浙江'],['ww','ee','qq']]);
    expect(wrapper.state('selectIndex')).to.eql([1,0]);
    expect(wrapper.state('selectedValue')).to.eql(['浙江','ww']);
    let level3Data =
      {
        "四川":{
          "成都":["青羊区","武侯区","温江区"],
          "绵阳":["绵阳中学","核弹基地"],
          "广安":["容县","武胜"]
        },
        "浙江":{
         "杭州":["西湖","银泰","玉泉"],
         "绍兴":["X1","X2","X3"],
          "place":["Y1","Y2","Y3","Y4","Y5"],
        },
        "some":{
         "place1":["Z1","Z2","Z3"],
          "place2":["Z4","Z5","Z6","Z7"],
          "place3":["A1","A2","A3","A4","A5","A6"],
        }
      }
    const wrapper1 = shallow(<Cpicker
      data={level3Data}
      level={3}/>)
    let cpicker1 = wrapper1.instance();
    cpicker1._changeLayout("浙江",0);
    expect(wrapper1.state('passData')).to.eql([['四川','浙江',"some"],['杭州','绍兴','place'],['西湖','银泰','玉泉']]);
    expect(wrapper1.state('selectIndex')).to.eql([1,0,0]);
    expect(wrapper1.state('selectedValue')).to.eql(['浙江','杭州','西湖']);
    const wrapper2 = shallow(<Cpicker
      selectIndex={[0,0,0]}
      data={level3Data}
      level={3}/>)
    let cpicker2 = wrapper2.instance();
    cpicker2._changeLayout("温江区",2);
    expect(wrapper2.state('passData')).to.eql([['四川','浙江',"some"],['成都','绵阳','广安'],['青羊区','武侯区','温江区']]);
    expect(wrapper2.state('selectIndex')).to.eql([0,0,2]);
    expect(wrapper2.state('selectedValue')).to.eql(['四川','成都','温江区']);
  })
})

describe("STATE FROM PROPS ROLL2", () => {
  it("check the stateFromProps function", () => {
    let props = {
      data: ["四川","浙江"],
      selectIndex: 0,
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    let returnValue = pickRoll._stateFromProps(props);
    expect(returnValue.selectedIndex).to.equal(0);
    expect(returnValue.items).to.have.length(2);
    expect(returnValue.pickerStyle).to.equal(undefined);
    expect(returnValue.itemStyle).to.equal(undefined);
  })
})

//style没验证
describe("MOVE ROLL2", () => {
  it("check the move function", () => {
    let props = {
      data: ["四川","浙江"],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    pickRoll.index = 0;
    pickRoll._move(10);
    expect(pickRoll.middleHeight).to.equal(10);
  })
})

describe("MOVETO", () => {
  it("check the moveTo function", () => {
    let spy = sinon.spy();
    let props = {
      data: ["四川","浙江"],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
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

//change function
describe("VALUE CHANGE", () => {
  it("check the onValueChange function",() => {
    let spy = sinon.spy();
    let props = {
      data: ["四川","浙江","上海"],
    };
    const wrapper = shallow(<CPickroll data = {props.data} />);
    let pickRoll = wrapper.instance();
    pickRoll.index = 0;
    pickRoll._onValueChange();
    let returnValue = pickRoll._onValueChange();
    expect(returnValue).to.eql({value:"四川",label:"四川"});
  })
})

describe("HANDLEPAN RESPONDER", () => {
  it("check the handlePanResponderMove", () => {
    let spy = sinon.spy();
    let props = {
      data: ["四川","浙江"],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    pickRoll._move = spy;
    pickRoll.index = 1;
    pickRoll.isMoving = false;
    pickRoll._handlePanResponderMove({},{dy:10});
    expect(pickRoll._move.calledWith(10)).to.equal(true);

    pickRoll._handlePanResponderMove({},{dy:90});
    expect(pickRoll._move.calledWith(40)).to.equal(true);

    pickRoll.index = 0;
    pickRoll._handlePanResponderMove({},{dy:-50});
    expect(pickRoll._move.calledWith(-40)).to.equal(true);

    pickRoll._handlePanResponderMove({},{dy:-20});
    expect(pickRoll._move.calledWith(-20)).to.equal(true);

    pickRoll.isMoving = true;
    let returnValue = pickRoll._handlePanResponderMove({},{dy:10});
    pickRoll._handlePanResponderMove({},{dy:10});
    expect(returnValue).to.equal("you are moving");
  })
})

describe("HANDLEPAN RESPONDERRELEASE", () => {
  it("check the handlePanResponderRelease", () => {
    let spy = sinon.spy();
    let props = {
      data: ["四川","浙江"],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    pickRoll.middleHeight = 62;
    pickRoll._move = spy;
    pickRoll._handlePanResponderRelease();
    expect(pickRoll._move.calledWith(0)).to.equal(true);
    expect(pickRoll.index).to.equal(2);
    pickRoll.middleHeight = 50;
    pickRoll._handlePanResponderRelease();
    expect(pickRoll.index).to.equal(1);

  })
})

describe("RENDERITEMS", () => {
  it("check the renderItems function",() => {
    let props = {
      data: ["四川","浙江"],
      items: [{value:"四川",label:"四川"},{value:"浙江",label:"浙江"}],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    pickRoll._renderItems(props.items);
    expect(wrapper.find(Text)).to.have.length(6);
  });
})

describe("EVENT TEST", () => {
  it("checkt the csetup dom-like event", () => {
    let spy = sinon.spy();
    let spy1 = sinon.spy();
    let spy2 = sinon.spy();
    let spy3 = sinon.spy();
    let spy4 = sinon.spy();
    let level2Data = {
      "四川":["w","e","q"],
      "浙江":["ww","ee","qq","sa"],
    }
    const wrapper = shallow(<Cpicker
      level = {2}
      selectIndex = {[1,1]}
      data = {level2Data}
    /> );
    let cpicker = wrapper.instance();
    cpicker._setEventBegin = spy;
    cpicker._confirmChose = spy1;
    cpicker._cancelChose = spy2;
    cpicker._setModalVisible = spy3;
    cpicker._changeLayout = spy4;
    wrapper.find('TextInput').simulate('focus');
    expect(cpicker._setEventBegin.calledOnce).to.equal(true);
    wrapper.find('.confirm').simulate('press');
    expect(cpicker._confirmChose.calledOnce).to.equal(true);
    wrapper.find('.cancel').simulate('press');
    expect(cpicker._cancelChose.calledOnce).to.equal(true);
    wrapper.find('Modal').simulate('RequestClose');
    expect(cpicker._setModalVisible.callCount).to.equal(1);
    wrapper.find(CPicker).find(".test1").simulate("ValueChange");
    expect(cpicker._changeLayout.callCount).to.equal(1);
  })
  it("check the roll2 dom-like event", () => {
    let spy = sinon.spy();
    let props = {
      data: ["四川","浙江","江苏"],
    };
    const wrapper = shallow(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
    pickRoll._moveTo = spy;
    wrapper.find(Text).find(".up1").simulate('press');
    expect(pickRoll._moveTo.calledOnce).to.equal(true);
    wrapper.find(Text).find(".down1").simulate('press');
    expect(pickRoll._moveTo.callCount).to.equal(2);
  })
})

describe("CHECK THE REF", () => {
  it("check the ref", () => {
    let props = {
      data: ["四川","浙江","江苏","重庆"],
    };
    const wrapper = mount(<CPickroll data = {props.data}/>);
    let pickRoll = wrapper.instance();
  })
})
