import React, { Component } from "react";
import { Text, View } from "react-native";

// Styles
import styles from "./Styles/SquareShipLeftStyle";
import Salvo from "../Salvo";
import { Colors } from "../../../../Themes/index";

export default class SquareShipLeft extends Component {
  renderSalvo = () => {
    if (this.props.isSunk) {
      return <Salvo length={this.props.length} color={Colors.bloodOrange} />;
    }
  };

  render() {
    const square = this.props.square;
    let backgroundStyle, borderStyle;
    backgroundStyle = styles.shipBackground;
    borderStyle =
      styles[
        "horizontal" +
          (square.horizontal ? "True" : "False") +
          "AndPart" +
          square.part
      ];

    return (
      <View
        style={[
          styles.basic,
          backgroundStyle,
          { width: this.props.length, height: this.props.length },
          borderStyle
        ]}
      >
        {this.renderSalvo()}
      </View>
    );
  }
}
