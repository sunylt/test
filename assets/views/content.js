import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import TodoListView from './list';
import Style from '../stylesheet/style';

export default class AppContent extends Component {
  render() {
    return (
      <View style={Style.content}>
        <Text style={Style.title}>Todos</Text>
        <TodoListView />
      </View>
    );
  }
}