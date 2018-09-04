import React, { PureComponent } from "react";
import styles from "./Styles/GameListItemStyle";
import { Text, View, TouchableOpacity } from "react-native";

class GameListItem extends PureComponent {
  getDistance = () => {
    const distance = this.props.distance;
    let meterOrKilometer =
      distance < 1000 ? distance + " m" : (distance / 1000).toFixed(1) + " km";

    if (distance !== null) {
      return <Text style={styles.stage}>{meterOrKilometer}</Text>;
    }
  };

  getStage = (gameCanBeJoined, gameHasCurrentPlayer) => {
    const stage = this.props.stage;
    if (
      stage === "placingShips" &&
      this.props.gamePlayers.length === 1 &&
        (this.props.currentUser === null || gameHasCurrentPlayer)
    ) {
      return <Text style={styles.stage}>Waiting</Text>;
    } else if (stage === "placingShips" && gameCanBeJoined) {
      return this.getDistance();
    } else if (stage === "placingShips") {
      return <Text style={styles.stage}>Place ships</Text>;
    } else if (stage === "placingSalvoes") {
      return <Text style={styles.stage}>Turn {this.props.turn}</Text>;
    } else if (stage === "gameOver") {
      return <Text style={styles.stage}>Winner: {this.props.winner}</Text>;
    }
  };

  render() {
    const gamePlayer2 = this.props.gamePlayers[1] ? (
      <Text>{this.props.gamePlayers[1].player.userName} </Text>
    ) : (
      <Text>...</Text>
    );

    // check if current user can join the game and define, if touchableOpacity is clickable and define style
    const currentUser = this.props.currentUser;
    let gamePlayerIdOfCurrentUser = null;
    if (currentUser !== null) {
      this.props.gamePlayers.forEach(gamePlayer => {
        if (gamePlayer.player.id === currentUser.id) {
          gamePlayerIdOfCurrentUser = gamePlayer.id;
        }
      });
    }
    const gameHasCurrentPlayer = gamePlayerIdOfCurrentUser !== null;
    const gameCanBeJoined =
      this.props.gamePlayers.length === 1 && !gameHasCurrentPlayer;

    return (
      <TouchableOpacity
        style={styles.basic}
        onPress={() => {
          if (gameHasCurrentPlayer) {
            this.props.changeGame(gamePlayerIdOfCurrentUser);
          }
          if (gameCanBeJoined) {
            this.props.joinGame(this.props.id);
          }
        }}
        disabled={currentUser === null}
      >
        <View style={styles.col}>
          <Text style={styles.players}>
            {this.props.gamePlayers[0].player.userName} vs {gamePlayer2}
          </Text>
          <Text style={styles.time}>{this.props.created}</Text>
        </View>
        {this.getStage(gameCanBeJoined, gameHasCurrentPlayer)}
      </TouchableOpacity>
    );
  }
}

export default GameListItem;
