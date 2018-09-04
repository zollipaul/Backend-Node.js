import React, { Component } from "react";
import { Animated } from "react-native";

// Styles
import styles from "./Styles/CrosshairStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Metrics } from "../../../Themes/index";

class Crosshair extends Component {
  render() {
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    const crosshairPanStyle = {
      transform: [
        {
          translateX: this.props.crosshairPan.x
        },
        {
          translateY: this.props.crosshairPan.y
        }
      ]
    };

    const absolutePosition = {
      top:
        this.props.crosshairInitialPosition.locationY - Metrics.crosshair / 2,
      left:
        this.props.crosshairInitialPosition.locationX - Metrics.crosshair / 2
    };

    return (
      <AnimatedIcon
        {...this.props.panHandlers}
        style={[crosshairPanStyle, styles.crosshair, absolutePosition]}
        name="target"
        size={Metrics.crosshair}
        color={Colors.white}
      />
    );
  }
}

export default Crosshair;
