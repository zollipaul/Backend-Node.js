import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Salvo extends Component {
  render() {
    return (
      <Icon
        name={"times"}
        size={this.props.length * 0.85}
        color={this.props.color}
      />
    );
  }
}
