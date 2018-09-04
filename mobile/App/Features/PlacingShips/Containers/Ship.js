import React, { PureComponent } from "react";
import { PanResponder, Animated } from "react-native";
import { connect } from "react-redux";
import ShipActions from "../../../Redux/ShipsRedux";
import getChars from "../../../Data/getChars";

// Styles & Metrics
import styles from "./Styles/ShipStyle";
import { Metrics } from "../../../Themes/index";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

class Ship extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.ship.id,
      size: props.ship.size,
      pan: new Animated.ValueXY({ x: 0, y: 0 }),
      spin: new Animated.Value(0),
      rotation: new Animated.Value(0),
      swing: new Animated.Value(0),
      nextRotationIsSpin: false,
      locationX: 0,
      locationY: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ships.counter !== this.props.ships.counter) {
      if (this.props.ships.counter === 0 && !this._startingPosition) {
        this._panRespCanStart = false;
        this._startingPosition = true;
        // console.log("ship back to starting position");
        // console.log(this._val.x);
        // console.log(this._lastPos.x);
        // console.log(this.state.pan.x);
        this.state.pan.extractOffset();
        Animated.parallel([
          Animated.timing(this.state.pan, {
            toValue: { x: this._lastPos.x * -1, y: this._lastPos.y * -1 },
            duration: 800,
            delay: 0
          }),
          Animated.timing(this.state.spin, {
            toValue: 800,
            duration: 0
          })
        ]).start(() => {
          this._lastPos = this._val;
          this._panRespCanStart = true;
        });
      }
    }
  }

  componentWillMount() {
    console.log("mount");

    this._panRespCanStart = true;
    this._lastPos = { x: 0, y: 0 };
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener(value => (this._val = value));
    console.log(this._val);
    const squareLength = Metrics.placingShipsSquareLength;
    let previousTimeStamp = 0;
    this._startingPosition = true;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => this._panRespCanStart,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.extractOffset();
        // console.log("pageX: " + e.nativeEvent.pageX + " pageY: " + e.nativeEvent.pageY);
        // console.log(
        //   "touch rel. element: " + e.nativeEvent.locationX,
        //   e.nativeEvent.locationY
        // );
        this.state.rotation.extractOffset();
        this.setState({
          locationX: e.nativeEvent.locationX,
          locationY: e.nativeEvent.locationY
        });
      },
      onPanResponderMove: (e, gesture) => {
        this.state.pan.setValue({ x: gesture.dx, y: gesture.dy });
        // console.log(this._val)
      },
      // Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }]),
      onPanResponderRelease: (e, gesture) => {
        const horizontal = this.props.ships.data[this.state.id].horizontal;
        const prevShipXLocation = this.props.ships.data[this.state.id]
          .coordinates.shipXLocation;
        const prevShipYLocation = this.props.ships.data[this.state.id]
          .coordinates.shipYLocation;
        // console.log("moveX: " + gesture.moveX + " moveY: " + gesture.moveY);
        // console.log("pageX: " + e.nativeEvent.pageX + " pageY: " + e.nativeEvent.pageY);
        // console.log("x0: "+ gesture.x0 + " y0: " + gesture.y0)
        // console.log(
        //   "touch rel. element: " + e.nativeEvent.locationX,
        //   e.nativeEvent.locationY
        // );
        // console.log('horizontal: ' + horizontal)
        // console.log("dx, dy: " + gesture.dx, gesture.dy);

        // get px and py of gridPosition
        const { px, py } = this.props.gridPosition;
        // console.log("px + py:" + px, py)

        // get left upper corner of ship before move
        const luX0 =
          gesture.x0 -
          (horizontal
            ? this.state.locationX
            : squareLength - this.state.locationY);
        const luY0 =
          gesture.y0 -
          (horizontal ? this.state.locationY : this.state.locationX);
        // console.log("luX0, luY0:" + luX0, luY0);

        // get left upper corner of ship on move
        const luX =
          gesture.moveX -
          (horizontal
            ? this.state.locationX
            : squareLength - this.state.locationY);
        const luY =
          gesture.moveY -
          (horizontal ? this.state.locationY : this.state.locationX);
        // console.log("luX, luY: " + luX, luY);
        // console.log("squareLenght: " + squareLength)

        // get n: "index" (1, 2, 3 ...) of x-axis and m: "char" (A, B, C, ...) of y-axis
        const shipXLocation = Math.round((luX - px) / squareLength);
        const shipYLocation = Math.round((luY - py) / squareLength);

        // get sluX und sluY: left upper corner of square (n,m); + Metrics.borderWidth because of borders of grid
        const sluX =
          shipXLocation * squareLength + px + Metrics.borderWidth * 2;
        const sluY =
          shipYLocation * squareLength + py + Metrics.borderWidth * 2;
        // console.log("left upper of next square: " + sluX, sluY)

        // detect if double tap
        const currentTimeStamp = e.nativeEvent.timestamp;
        const dt = currentTimeStamp - previousTimeStamp;
        if (dt < 500) {
          const {
            shipXLocationAfterRotation,
            shipYLocationAfterRotation
          } = this.correctShipLocations(
            prevShipXLocation,
            prevShipYLocation,
            horizontal
          );
          const alignmentAfterRotation = !horizontal;

          if (
            this.outSideGridOrCollisionWithShip(
              shipXLocationAfterRotation,
              shipYLocationAfterRotation,
              alignmentAfterRotation
            ) &&
            !this._startingPosition
          ) {
            console.log("swing error: ship out of grid");
            this._panRespCanStart = false;
            ReactNativeHapticFeedback.trigger("notificationError", false);
            this.setState({ nextRotationIsSpin: false });
            Animated.spring(this.state.swing, {
              toValue: 1,
              duration: 200
            }).start(() => {
              this._panRespCanStart = true;
              this.state.swing.setValue(0);
            });
          } else {
            console.log("ship 90 deg rotation");
            this._panRespCanStart = false;
            ReactNativeHapticFeedback.trigger("impactLight", false);

            this.props.disableRotationTip();

            this.setState({ nextRotationIsSpin: true });
            Animated.parallel([
              Animated.timing(this.state.spin, {
                toValue: horizontal ? 1 : 0,
                duration: 200
              }),
              this.correctPositionDuringRotation(horizontal)
            ]).start(() => {
              this._panRespCanStart = true;

              // console.log("after spin: "+ this.state.spin._value)
              this._lastPos = this._val;

              if (this._startingPosition) {
                this.pushOnlyNewAlignment(alignmentAfterRotation);
              } else {
                this.pushShip(
                  shipXLocationAfterRotation,
                  shipYLocationAfterRotation,
                  alignmentAfterRotation
                );
              }
            });
          }
          // set previousTimeStamp for double tap
        } else if (this.shipTouched(gesture)) {
          previousTimeStamp = currentTimeStamp;
        }

        // if n on left or right side outside, if m upper or lower side outside --> back to start
        else if (
          this.outSideGridOrCollisionWithShip(
            shipXLocation,
            shipYLocation,
            horizontal
          )
        ) {
          this._panRespCanStart = false;
          this._startingPosition = true;
          console.log("ship back to starting position");
          ReactNativeHapticFeedback.trigger("notificationError", false);

          console.log(this._val.x);
          console.log(this._lastPos.x);
          console.log(this.state.pan.x);

          Animated.parallel([
            Animated.timing(this.state.pan, {
              toValue: { x: this._lastPos.x * -1, y: this._lastPos.y * -1 },
              duration: 200,
              delay: 0
            }),
            Animated.timing(this.state.spin, {
              toValue: 0,
              duration: 200
            })
          ]).start(() => {
            this._lastPos = this._val;

            console.log(this._val.x);

            this._panRespCanStart = true;
          });

          // reset ship in store
          this.resetShip();

          // adjust to left upper corner of the closest square
        } else {
          console.log("ship adjusted to grid");
          this._panRespCanStart = false;
          this._startingPosition = false;
          ReactNativeHapticFeedback.trigger("impactLight", false);

          let correction = 0;
          if (!horizontal) {
            correction = Metrics.borderWidth * 2;
          }

          Animated.timing(this.state.pan, {
            toValue: { x: sluX - luX0 - correction, y: sluY - luY0 },
            duration: 200,
            delay: 0
            // useNativeDriver: true
          }).start(() => {
            this._panRespCanStart = true;
            this._lastPos = this._val;

            console.log(this._val.x);
            console.log(this._lastPos.x);
            console.log(this.state.pan.x);
          });
          this.pushShip(shipXLocation, shipYLocation, horizontal);
        }
      }
    });
  }

  shipTouched = gesture => {
    return gesture.dx === 0 && gesture.dy === 0;
  };

  componentWillUnmount() {
    this.state.pan.removeAllListeners();
  }

  shipOutsideGrid = (shipXLocation, shipYLocation, horizontal) => {
    return (
      shipXLocation < 1 ||
      shipXLocation + this.getSize(horizontal).width - 1 > 10 ||
      shipYLocation < 1 ||
      shipYLocation + this.getSize(horizontal).height - 1 > 10
    );
  };

  collisionWithShip = locations => {
    let ships = this.props.ships.data;
    let allLocations = [];
    for (let key in ships) {
      if (ships.hasOwnProperty(key) && key !== this.state.id) {
        const ship = ships[key];
        allLocations.push(...ship.location);
      }
    }

    return locations.some(location => {
      return allLocations.includes(location);
    });
  };

  outSideGridOrCollisionWithShip = (
    shipXLocation,
    shipYLocation,
    horizontal
  ) => {
    if (this.shipOutsideGrid(shipXLocation, shipYLocation, horizontal)) {
      return true;
    }

    const locations = this.calculateLocationsArray(
      shipXLocation,
      shipYLocation,
      horizontal
    );
    return this.collisionWithShip(locations);
  };

  calculateLocationsArray = (shipXLocation, shipYLocation, horizontal) => {
    const size = this.props.ship.size;
    let shipLocations = [];
    for (let i = 0; i < size; i++) {
      shipLocations.push(
        horizontal
          ? getChars[shipYLocation] + (shipXLocation + i)
          : getChars[shipYLocation + i] + shipXLocation
      );
    }
    return shipLocations;
  };

  getSize = horizontal => {
    return horizontal
      ? {
          width: this.props.ship.size,
          height: 1
        }
      : {
          width: 1,
          height: this.props.ship.size
        };
  };

  // when shipSize is 2 or 4, the rotation needs to be corrected
  correctPositionDuringRotation = horizontal => {
    if (this.props.ship.size % 2 === 0) {
      const squareLength = Metrics.placingShipsSquareLength;
      const correction = horizontal
        ? { x: -1 * squareLength / 2, y: squareLength / 2 }
        : { x: squareLength / 2, y: -1 * squareLength / 2 };
      return Animated.timing(this.state.pan, {
        toValue: correction,
        duration: 200,
        delay: 0
      });
    }
  };

  correctShipLocations = (prevShipXLocation, prevShipYLocation, horizontal) => {
    if (this.props.ship.size === 2) {
      return {
        shipXLocationAfterRotation: prevShipXLocation,
        shipYLocationAfterRotation: prevShipYLocation
      };
    } else if (this.props.ship.size === 4) {
      return {
        shipXLocationAfterRotation: prevShipXLocation + (horizontal ? 1 : -1),
        shipYLocationAfterRotation: prevShipYLocation + (horizontal ? -1 : 1)
      };
    } else {
      const deltaValue = (this.props.ship.size - 1) / 2;
      return {
        shipXLocationAfterRotation:
          prevShipXLocation + (horizontal ? deltaValue : -1 * deltaValue),
        shipYLocationAfterRotation:
          prevShipYLocation + (horizontal ? -1 * deltaValue : deltaValue)
      };
    }
  };

  pushOnlyNewAlignment = horizontal => {
    this.props.pushShipToStore({
      id: this.props.ship.id,
      ship: {
        type: this.props.ship.type,
        size: this.props.ship.size,
        horizontal: horizontal,
        coordinates: {
          shipXLocation: 0,
          shipYLocation: 0
        },
        location: []
      }
    });
  };

  pushShip = (shipXLocation, shipYLocation, horizontal) => {
    this.props.pushShipToStore({
      id: this.props.ship.id,
      ship: {
        type: this.props.ship.type,
        size: this.props.ship.size,
        horizontal: horizontal,
        coordinates: {
          shipXLocation: shipXLocation,
          shipYLocation: shipYLocation
        },
        location: this.calculateLocationsArray(
          shipXLocation,
          shipYLocation,
          horizontal
        )
      }
    });
  };

  resetShip = () => {
    this.props.resetShip(this.state.id);
  };

  spinOrSwing = () => {
    const horizontal = this.props.ships.data[this.state.id].horizontal;

    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"]
    });

    const swing = this.state.swing.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: horizontal
        ? ["0deg", "15deg", "-10deg", "5deg", "-5deg", "0deg"]
        : ["90deg", "105deg", "80deg", "95deg", "85deg", "90deg"]
    });
    return this.state.nextRotationIsSpin ? spin : swing;
  };

  render() {
    const panStyle = {
      transform: [
        {
          translateX: this.state.pan.x
        },
        {
          translateY: this.state.pan.y
        },
        {
          rotate: this.spinOrSwing()
        }
      ]
    };

    const shipType = this.props.ship.type;

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.basic, styles[shipType]]}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    gridPosition: state.gridPosition.payload,
    ships: state.ships
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushShipToStore: data => dispatch(ShipActions.pushShip(data)),
    resetShip: id => dispatch(ShipActions.resetShip(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ship);
