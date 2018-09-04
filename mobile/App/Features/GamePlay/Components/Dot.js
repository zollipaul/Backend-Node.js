import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../../Themes/index";

export default class Salvo extends Component {
  render() {
    return (
      <Icon
        name={"circle"}
        size={this.props.length * 0.55}
        color={Colors.white}
      />
    );
  }
}
