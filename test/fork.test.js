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
