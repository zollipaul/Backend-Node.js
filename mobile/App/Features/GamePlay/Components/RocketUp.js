import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, } from "../../../Themes/index";

export default class RocketUp extends Component {
  render() {
    const rotate135 = {
      transform: [{ rotate: "-45deg" }]
    };

    return (
      <Icon name={"rocket"} size={50} color={Colors.white} style={rotate135} />
    );
  }
}
