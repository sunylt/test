import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import AppHeader from './assets/views/header';
import AppContent from './assets/views/content';
import AppFooter from './assets/views/footer';

class TestApp extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </View>
    );
  }
}

AppRegistry.registerComponent('test', () => TestApp);
