import React, { Component } from "react";
import SquarePlayerGrid from "./SquarePlayerGrid";
import { View } from "react-native";
import styles from "./Styles/GamePlayPlayerGridStyle";

export default class GamePlayPlayerGrid extends Component {
  renderPlayerGrid = () => {
    return this.props.grid.map(square => {
      return (
        <SquarePlayerGrid
          title={square.title}
          salvo={square.salvo}
          isShip={square.isShip}
          horizontal={square.horizontal}
          part={square.part}
          key={square.id}
        />
      );
    });
  };

  render() {
    return <View style={styles.playerGrid}>{this.renderPlayerGrid()}</View>;
  }
}
