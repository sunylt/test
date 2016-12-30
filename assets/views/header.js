import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Style from '../stylesheet/style';

export default class AppHeader extends Component {
  static defaultProps = {
    title: '今日干点嘛'
  };
  render() {
    return (
      <View style={Style.header}>
        <Text style={{textAlign: 'center', fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginTop: 28}}>{this.props.title}</Text>
      </View>
    )
  }
}