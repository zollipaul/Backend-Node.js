import React, { PureComponent } from "react";
import styles from "./Styles/ShotStyle";
import { Metrics } from "../../../Themes/index";
import { Animated, Easing } from "react-native";
import RocketDown from "./RocketDown";

export default class Shot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shootVal: new Animated.Value(-200)
    };
  }

  componentDidMount() {
    const id = this.props.id;
    Animated.timing(this.state.shootVal, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
      delay: id * 100
    }).start(() => {
      this.props.endShot();
      if (id === 4) {
        this.props.resetAllSalvoes();
      }
    });
  }

  render() {
    const shootTransform = {
      transform: [
        { translateY: this.state.shootVal },
        {
          rotate: "135deg"
        }
      ]
    };

    const interpolateOpacity = this.state.shootVal.interpolate({
      inputRange: [-10, 0],
      outputRange: [1, 0]
    });

    const shootOpacity = {
      opacity: interpolateOpacity
    };

    const absolutePosition = {
      top:
        this.props.shotPosition.locationY -
        Metrics.gamePlayOpponentGridWidth * 0.15 / 2,
      left:
        this.props.shotPosition.locationX -
        Metrics.gamePlayOpponentGridWidth * 0.15 / 2
    };

    return (
      <RocketDown
        style={[
          styles.torpedoDown,
          absolutePosition,
          shootTransform,
          shootOpacity
        ]}
        size={this.props.length * 1.7}
      />
    );
  }
}
