import React, { Component } from "react";
import { View } from "react-native";
import SquareShipLeft from "./SquareShipLeft";
import styles from "./Styles/ShipLeftStyle";

export default class ShipLeft extends Component {
  render() {
    const ship = this.props.ship;
    return (
      <View style={styles.ship}>
        {ship.squares.map((square, i) => {
          return (
            <SquareShipLeft
              key={i}
              square={square}
              length={20}
              isSunk={ship.isSunk}
            />
          );
        })}
      </View>
    );
  }
}
