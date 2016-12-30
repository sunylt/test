import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyScene extends Component {
  static defaultProps = {
    title: 'default title'
  };
  
  constructor(props) {
    super(props);
    this.state = {'color': 'red'}
  }

  render() {
    let _color = this.state.color;
    return (
      <Text onPress={() => {this.changeColor(Math.random()*10 >= 5 ? 'green' : 'yellow')}} style={{color:_color}}>Hi! My namse is {this.props.title}</Text>
    )
  }
  
  changeColor(color) {
    this.setState({'color':color});
  }
}