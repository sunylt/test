import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Style from '../stylesheet/style';

export default class AppFooter extends Component {
  render() {
    return (
      <View style={Style.footer}>
        <Text style={{textAlign: 'center', fontSize: 12, lineHeight: 30, color: '#999'}}>Powered by React Native</Text>
      </View>
    )
  }
}