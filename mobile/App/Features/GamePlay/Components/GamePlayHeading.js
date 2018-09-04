// @flow

import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./Styles/GamePlayHeadingStyle";
import { Colors } from "../../../Themes/index";

type Props = {
  salvoesLeft: number,
  stage: number,
  opponent: string,
  turn: number
};

export default class GamePlayHeading extends Component<Props> {
  salvoText = () => {
    const salvoesLeft = this.props.salvoesLeft;
    return salvoesLeft === 1
      ? "Fire one Shot away!"
      : salvoesLeft === 0
        ? "No Shots left!"
        : "Fire " + salvoesLeft + " Shots away!";
  };

  renderStage = () => {
    if (this.props.stage === "myTurnAndOpponentHasNotShot") {
      return <Text style={styles.stage}>{this.salvoText()}</Text>;
    }

    if (this.props.stage === "myTurnAndOpponentHasShot") {
      return (
        <View style={styles.stageContainer}>
          <Text style={styles.stage}>{this.salvoText()}</Text>
          <View style={styles.hurryView}>
            <Text style={styles.hurryText}>Hurry up,</Text>
            <Text style={styles.hurryText}>{this.props.opponent}</Text>
            <Text style={styles.hurryText}>is waiting for you!</Text>
          </View>
        </View>
      );
    }

    if (this.props.stage === "waitingForSalvoOfOpponent") {
      return (
        <View style={styles.stageContainer}>
          <Text style={styles.stage}>Waiting on opponent</Text>
          <ActivityIndicator
            size="large"
            color={Colors.grid}
            style={styles.activityIndicator}
          />
        </View>
      );
    }

    if (this.props.stage === "gameOver") {
      return (
        <View style={styles.stageContainer}>
          <Text style={styles.stage}>Game Over</Text>
          <Text style={styles.stage}>Winner is: {this.props.winner}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.turn}>Turn {this.props.turn}</Text>
        {this.renderStage()}
      </View>
    );
  }
}
