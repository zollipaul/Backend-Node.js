import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import PlayButton from "./PlayButton";
import GameGridActions from "../../../Redux/PlacingShipsGridPositionRedux";
import PlacingShipsGrid from "../Components/PlacingShipsGrid";
import ShipsContainer from "../Components/ShipsContainer";

// Styles
import styles from "./Styles/PlacingShipsStyles";

class PlacingShipsScreen extends Component {
  measureLayout = event => {
    this.props.postGameGridX(event.nativeEvent.layout.x);
  };

  render() {
    console.log("renderPlaScreen");
    return this.props.gameView.payload !== null ? (
      <View style={styles.container}>
        <PlacingShipsGrid
          grid={
            this.props.gameView.payload.gameGrids[
              this.props.gameView.payload.id
            ]
          }
          measureLayout={this.measureLayout}
        />
        <View style={styles.container}>
          <ShipsContainer counterIsZero={this.props.counterIsZero} />
          <PlayButton />
        </View>
      </View>
    ) : (
      <Text>Loading...</Text>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView,
    counterIsZero: state.ships.counter === 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postGameGridX: px => {
      dispatch(GameGridActions.postGameGridX(px));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
