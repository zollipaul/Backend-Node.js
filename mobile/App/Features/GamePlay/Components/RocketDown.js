import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, } from "../../../Themes/index";
import { Animated } from "react-native";

export default class RocketDown extends Component {
  render() {
    const AnimatedRocket = Animated.createAnimatedComponent(Icon);
    return (
      <AnimatedRocket
        name={"rocket"}
        size={this.props.size}
        color={Colors.white}
        style={[this.props.style]}
      />
    );
  }
}
