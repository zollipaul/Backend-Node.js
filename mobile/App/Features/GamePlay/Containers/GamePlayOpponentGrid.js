import React, { Component } from "react";
import { View, PanResponder, Animated } from "react-native";
import OpponentGrid from "./OpponentGrid";
import styles from "./Styles/GamePlayOpponentGridStyle";
import { connect } from "react-redux";
import SalvoActions from "../../../Redux/SalvoRedux";
import ManageGameActions from "../../../Redux/ManageGameRedux";
import GameViewActions from "../../../Redux/GameViewRedux";
import { Metrics } from "../../../Themes/index";
import Crosshair from "../Components/Crosshair";
import getChars from "../../../Data/getChars";
import Torpedos from "../Components/Torpedos";
import SwipeDown from "../Components/SwipeDown";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

class GamePlayOpponentGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridPan: new Animated.Value(0),
      crosshairPan: new Animated.ValueXY({ x: 0, y: 0 }),
      crosshairInitialPosition: {
        locationX: 0,
        locationY: 0
      },
      showCrosshair: false,
      hideSwipeDownShowTorpedos: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.newSalvo.length !== prevProps.newSalvo.length &&
      this.props.fiveShotsReached
    ) {
      this.setState({ hideSwipeDownShowTorpedos: false });
      Animated.loop(
        Animated.sequence([
          Animated.timing(this.state.gridPan, {
            toValue: 70,
            duration: 500,
            useNativeDriver: true,
            delay: 800
          }),
          Animated.spring(this.state.gridPan, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          })
        ]),
        {
          iterations: 3
        }
      ).start();
    }
  }

  componentWillMount() {
    let onceHaptic = true;
    this._panRespCanStart = true;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: e =>
        (this.props.stage === "myTurnAndOpponentHasNotShot" ||
          this.props.stage === "myTurnAndOpponentHasShot") &&
        this._panRespCanStart,
      onPanResponderGrant: (e, gesture) => {
        this.state.gridPan.setValue(0);
        const id = this.getId(e);
        if (this.props.newSalvo.some(location => location === id)) {
          this.props.toggleSalvo(id);
        } else if (this.props.fiveShotsReached) {
          this.props.stopGameViewSync();
          this.setState({ hideSwipeDownShowTorpedos: true });
        } else if (!this.isOutsideGrid(e)) {
          this.setState({
            showCrosshair: true,
            crosshairInitialPosition: {
              locationX: e.nativeEvent.locationX,
              locationY: e.nativeEvent.locationY
            }
          });
        }
      },

      onPanResponderMove: (e, gestureState) => {
        // console.log('dx, dy' + gestureState.dx, gestureState.dy)

        // console.log(
        //   "touch rel. element: " + e.nativeEvent.locationX,
        //   e.nativeEvent.locationY
        // );
        if (!this.props.fiveShotsReached) {
          if (this.isOutsideGrid(e)) {
            this.resetCrosshair();
            return;
          }

          return Animated.event([
            null,
            {
              dx: this.state.crosshairPan.x,
              dy: this.state.crosshairPan.y
            }
          ])(e, gestureState);
        } else {
          if (gestureState.dy > 0) {
            this.state.gridPan.setValue(gestureState.dy);
          }

          if (gestureState.dy < 100) {
            if (!onceHaptic) {
              onceHaptic = true;
            }
          } else {
            if (onceHaptic) {
              ReactNativeHapticFeedback.trigger("impactHeavy", false);
              onceHaptic = false;
            }
          }
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (this.state.showCrosshair) {
          this.resetCrosshair();
          this.toggleSalvo(this.getId(e));
        } else {
          this._panRespCanStart = false;
          const releasePosition = gestureState.dy;
          if (releasePosition > 100) {
            this.props.postSalvoes();
          }
          Animated.spring(this.state.gridPan, {
            toValue: 0,
            tension: 20,
            useNativeDriver: true
          }).start(() => {
            this._panRespCanStart = true;
          });
        }
      }
    });
  }

  toggleSalvo = id => {
    const salvoHasNoOldSalvo = !this.props.oldSalvoes
      .filter(salvo => salvo.gamePlayerId === this.props.gamePlayerId)
      .some(salvo => salvo.locations.some(location => location === id));
    if (salvoHasNoOldSalvo) {
      ReactNativeHapticFeedback.trigger("impactLight", false);
      this.props.toggleSalvo(id);
    }
  };

  getId = e => {
    const salvoXLocation = Math.floor(
      e.nativeEvent.locationX / Metrics.gamePlayOpponentSquareLength
    );
    const salvoYLocation = Math.floor(
      e.nativeEvent.locationY / Metrics.gamePlayOpponentSquareLength
    );
    return getChars[salvoYLocation] + salvoXLocation;
  };

  isOutsideGrid = e => {
    const locationX = e.nativeEvent.locationX;
    const locationY = e.nativeEvent.locationY;
    return (
      locationX < Metrics.gamePlayOpponentSquareLength ||
      locationX > Metrics.gamePlayOpponentGridWidth ||
      locationY < Metrics.gamePlayOpponentSquareLength ||
      locationY > Metrics.gamePlayOpponentGridWidth
    );
  };

  resetCrosshair = () => {
    this.setState({ showCrosshair: false });
    this.state.crosshairPan.setValue({
      x: 0,
      y: 0
    });
  };

  swipeDownOrTorpedos = () => {
    return this.state.hideSwipeDownShowTorpedos ? (
      <Torpedos gridPan={this.state.gridPan} />
    ) : (
      <SwipeDown />
    );
  };

  renderCrosshair = () => {
    if (this.state.showCrosshair) {
      return (
        <Crosshair
          panHandlers={this.panResponder.panHandlers}
          crosshairPan={this.state.crosshairPan}
          crosshairInitialPosition={this.state.crosshairInitialPosition}
        />
      );
    }
  };

  render() {
    const gridPanStyle = {
      transform: [
        {
          translateY: this.state.gridPan
        }
      ]
    };

    return (
      <View style={styles.opponentGridContainer}>
        {this.swipeDownOrTorpedos()}
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[gridPanStyle, styles.opponentGrid]}
        >
          <OpponentGrid />
          {this.renderCrosshair()}
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    newSalvo: state.salvoes,
    oldSalvoes: state.gameView.payload.salvoes,
    stage: state.gameView.payload.stage,
    gamePlayerId: state.gameView.payload.id,
    turn: state.gameView.payload.turn,
    fiveShotsReached: state.salvoes.length === 5
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSalvo: salvo => {
      dispatch(SalvoActions.toggleSalvo(salvo));
    },
    resetAllSalvoes: () => {
      dispatch(SalvoActions.resetAllSalvoes());
    },
    postSalvoes: () => {
      dispatch(ManageGameActions.postSalvoesRequest());
    },
    stopGameViewSync: () => {
      dispatch(GameViewActions.stopGameViewSync());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GamePlayOpponentGrid
);
