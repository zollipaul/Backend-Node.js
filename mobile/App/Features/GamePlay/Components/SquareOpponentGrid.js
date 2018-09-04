import React, { PureComponent } from "react";
import { Animated, Text, View } from "react-native";
import Salvo from "./Salvo";
import Dot from "./Dot";
import Shot from "./Shot";
import styles from "./Styles/SquareOpponentGridStyle";
import { Colors, Metrics } from "../../../Themes/index";

const length = Metrics.gamePlayOpponentSquareLength;

class SquareOpponentGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shootNow: false,
      shipScale: new Animated.Value(1),
      hitScale: new Animated.Value(1),

      salvo: props.salvo,
      hit: props.hit,
      isShip: props.isShip,
      showDot: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id === "A3") {
      console.log(prevProps);
      console.log(this.props);
    }

    if (
      !prevProps.salvo &&
      this.props.salvo &&
      !prevState.shootNow &&
      !this.state.shootNow
    ) {
      this.setState({ shootNow: true });
    } else if (this.props.startShipAnimation && !prevProps.startShipAnimation) {
      this.shipAnimation();
    }
  }

  colorSalvo = () => {
    return this.state.isShip ? Colors.highlight : Colors.white;
  };

  renderContent = () => {
    // numbers and letters of grid
    if (this.props.title || this.props.id === "00") {
      return <Text style={styles.title}>{this.props.title}</Text>;
    }

    // oldSalvo
    else if (this.state.salvo) {
      return <Salvo length={length} color={this.colorSalvo()} />;
    }

    // newSalvo
    else if (this.props.newSalvo && this.state.showDot) {
      return <Dot length={length} />;
    }
  };

  hitAnimation = () => {
    this.setState({
      salvo: true,
      hit: true
    });
    Animated.sequence([
      Animated.timing(this.state.hitScale, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.hitScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {});
  };

  shipAnimation = () => {
    this.setState({
      isShip: true,
      showDot: false,
      salvo: false
    });

    Animated.sequence([
      Animated.timing(this.state.shipScale, {
        toValue: 3,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(this.state.shipScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      this.setState({ salvo: true, showDot: true });
    });
  };

  endShot = () => {
    this.setState({
      shootNow: false
    });

    if (this.props.hit) {
      this.hitAnimation();
    } else if (this.props.isShip) {
      this.props.shipAnimation(this.props.isShipId);
    } else if (this.props.salvo) {
      this.setState({ salvo: true });
    }
  };

  shoot() {
    if (this.state.shootNow) {
      return (
        <Shot
          shotPosition={{
            locationX: length / 2,
            locationY: length / 2
          }}
          length={length}
          endShot={this.endShot}
          id={this.props.newSalvoId}
          resetAllSalvoes={this.props.resetAllSalvoes}
        />
      );
    }
  }

  ship = () => {
    let borderStyle;
    if (this.state.isShip) {
      const shipScale = {
        transform: [{ scale: this.state.shipScale }]
      };

      const borderStyle =
        styles[
          "shipHorizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
      return <Animated.View style={[styles.ship, borderStyle, shipScale]} />;
    } else if (this.props.isMissed) {
      const missedShipBackground = styles.missedShipBackground;
      borderStyle =
        styles[
          "shipHorizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
      return <View style={[styles.ship, borderStyle, missedShipBackground]} />;
    }
  };

  render() {
    const hitScale = {
      transform: [{ scale: this.state.hitScale }]
    };

    console.log("renderSquare");
    let backgroundStyle, borderStyle;

    if (this.state.hit) {
      backgroundStyle = styles.hitBackground;
    } else if (this.props.newSalvo) {
      backgroundStyle = styles.currentSalvoBackground;
    }

    if (this.state.isShip || this.props.isMissed) {
      borderStyle =
        styles[
          "squareHorizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
      backgroundStyle = null;
    }

    return (
      <Animated.View
        style={[styles.basic, backgroundStyle, borderStyle, hitScale]}
        pointerEvents="none"
      >
        {this.ship()}
        {this.renderContent()}

        {this.shoot()}
      </Animated.View>
    );
  }
}

export default SquareOpponentGrid;

