import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import GamePlayPlayerGrid from "../Components/GamePlayPlayerGrid";
import GamePlayOpponentGrid from "./GamePlayOpponentGrid";
import SalvoActions from "../../../Redux/SalvoRedux";
import ShipsLeftContainer from "../Components/ShipsLeft/ShipsLeftContainer";
import GamePlayHeading from "../Components/GamePlayHeading";
// Styles
import styles from "./Styles/GamePlayScreenStyle";
import Loading from "../../Waiting/Components/Loading";

class PlacingShipsScreen extends Component {
  constructor(props) {
    super(props);
  }

  getOpponentName = () => {
    if (this.props.gameView.game.gamePlayers.length === 2)
      return this.props.gameView.game.gamePlayers.filter(
        gamePlayer => gamePlayer.id === this.props.gameView.opponentId
      )[0].player.userName;
  };

  render() {
    if (this.props.gameView !== null) {
      const playerId = this.props.gameView.id;
      const gameGridPlayer = this.props.gameView.gameGrids[playerId];
      return (
        <View style={styles.container}>
          <View style={styles.gameGridPlayerAndOpponentShips}>
            <GamePlayPlayerGrid grid={gameGridPlayer} />
            <View style={styles.centered}>
              <GamePlayHeading
                turn={this.props.gameView.turn}
                stage={this.props.gameView.stage}
                winner={this.props.gameView.winner}
                salvoesLeft={5 - this.props.salvoes.length}
                opponent={this.getOpponentName()}
              />
              <ShipsLeftContainer sinks={this.props.gameView.sinks} />
            </View>
          </View>
          <GamePlayOpponentGrid />
        </View>
      );
    } else {
      return <Loading/>;
    }
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView.payload,
    salvoes: state.salvoes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlacingShipsScreen);
