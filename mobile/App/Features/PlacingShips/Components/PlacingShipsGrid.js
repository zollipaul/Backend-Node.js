import React, { Component } from "react";
import styles from "./Styles/PlacingShipsGridStyle";
import { View } from "react-native";
import SquarePlacingShips from "./SquarePlacingShips";

export default class PlacingShipsGrid extends Component {
  renderSquares = () => {
    return this.props.grid.map(square => {
      return (
        <SquarePlacingShips
          title={square.title}
          key={square.id}
        />
      );
    });
  };

  render() {
    return (
      <View style={styles.centered}>
        <View style={styles.grid} onLayout={this.props.measureLayout}>
          {this.renderSquares()}
        </View>
      </View>
    );
  }
}
