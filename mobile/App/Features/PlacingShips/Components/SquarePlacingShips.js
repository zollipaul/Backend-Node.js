import React, { PureComponent } from "react";
import { Text, View } from "react-native";

// Styles
import styles from "./Styles/SquarePlacingShipsStyle";

class SquarePlacingShips extends PureComponent {
  renderTitle = () => {
    if (this.props.title) {
      return <Text style={styles.title}>{this.props.title}</Text>;
    }
  };

  render() {
    return <View style={styles.basic}>{this.renderTitle()}</View>;
  }
}

export default SquarePlacingShips;
