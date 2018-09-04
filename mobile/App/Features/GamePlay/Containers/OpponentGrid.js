import React, { Component } from "react";
import SquareOpponentGrid from "../Components/SquareOpponentGrid";
import SalvoActions from "../../../Redux/SalvoRedux";
import { connect } from "react-redux";
import AnimationActions from "../../../Redux/AnimationRedux";

class OpponentGrid extends Component {
  getLastSalvo = salvoes => {
    const mySalvoes = salvoes.filter(
      salvo => salvo.gamePlayerId === this.props.gamePlayerId
    );

    return mySalvoes.reduce(
      (total, current) => (current.turn > total.turn ? current : total),
      mySalvoes[0]
    );
  };

  render() {
    let newSalvoLocations;
    if (this.props.stage === "waitingForSalvoOfOpponent") {
      newSalvoLocations = this.getLastSalvo(this.props.oldSalvoes).locations;
    } else {
      newSalvoLocations = this.props.newSalvo;
    }
    return this.props.grid.map(square => {
      const hasNewSalvo = newSalvoLocations.some(
        location => square.id === location
      );
      const newSalvoId = newSalvoLocations.indexOf(square.id);

      return (
        <SquareOpponentGrid
          hit={square.hit}
          horizontal={square.horizontal}
          id={square.id}
          isShip={square.isShip}
          isShipId={square.isShipId}
          isMissed={square.isMissed}
          part={square.part}
          salvo={square.salvo}
          key={square.id}
          title={square.title}
          newSalvo={hasNewSalvo}
          newSalvoId={newSalvoId}
          resetAllSalvoes={this.props.resetAllSalvoes}
          startShipAnimation={this.props.startShipAnimation === square.isShipId}
          shipAnimation={this.props.shipAnimation}
        />
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    startShipAnimation: state.shipAnimation.payload,
    grid: state.gameView.payload.gameGrids[state.gameView.payload.opponentId],
    newSalvo: state.salvoes,
    oldSalvoes: state.gameView.payload.salvoes,
    stage: state.gameView.payload.stage,
    gamePlayerId: state.gameView.payload.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAllSalvoes: () => {
      dispatch(SalvoActions.resetAllSalvoes());
    },
    shipAnimation: id => {
      dispatch(AnimationActions.shipAnimation(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentGrid);
