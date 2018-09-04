import React, { Component } from "react";
import { View } from "react-native";
import ShipLeft from "./ShipLeft";
import Ships from "../../../../Data/OpponentShips";

// Styles
import styles from "./Styles/ShipsLeftContainer";

export default class ShipsLeftContainer extends Component {

  renderShip = ship => {
    if (!ship.isSunk) {
      return <ShipLeft ship={ship} />;
    }
  };

  render() {
    const ships = JSON.parse(JSON.stringify(Ships));
    const sinks = this.props.sinks;
    sinks.forEach(ship => {
      ships[ship.type].isSunk = true;
    });

    return (
      <View style={styles.container}>
        {this.renderShip(ships["patrolBoat"])}
        {this.renderShip(ships["battleship"])}
        <View style={styles.row}>
          {this.renderShip(ships["destroyer"])}
          {this.renderShip(ships["submarine"])}
        </View>
        {this.renderShip(ships["aircraftCarrier"])}
      </View>
    );
  }
}
