import 'react-native';
import React from 'react';
import {
  Modal
} from 'react-native';
import {shallow, mount} from 'enzyme';
import {jsdom} from 'jsdom';
import Index from '../index.android.js';
import Picker, {CascadePicker} from '../app/pickerLogic/picker';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';



describe('INIT TEST', () => {
  it('check the default value', () => {
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
    const wrapper = shallow( <Picker/>);

    expect(wrapper.prop('animationType')).toEqual('none');
    expect(wrapper.prop('visible')).toEqual(false);
    expect(wrapper.prop('enable')).toEqual(true);
    expect(wrapper.prop('inputValue')).toEqual('please chose');
    expect(wrapper.prop('confirmBtnText')).toEqual('确定');
    expect(wrapper.prop('cancelBtnText')).toEqual('取消');
  });
});
