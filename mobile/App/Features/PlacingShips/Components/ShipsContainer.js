import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import Ship from "../Containers/Ship";
import styles from "./Styles/ShipsContainerStyle";
import Ships from "../../../Data/Ships";

export default class ShipsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rotationTipEnabled: true
    };
  }

  renderRotationTip = () => {
    if (this.state.rotationTipEnabled) {
      return <Text style={styles.text}>Double tap to rotate!</Text>;
    }
  };

  disableRotationTip = () => {
    this.setState({ rotationTipEnabled: false });
  };

  render() {
      console.log("renderContainer");
      return (
      <View style={styles.container}>
        <View style={styles.rows}>
          <Ship
            ship={Ships["2"]}
            disableRotationTip={this.disableRotationTip}
          />
          <Ship
            ship={Ships["5"]}
            disableRotationTip={this.disableRotationTip}
          />
        </View>
        <View style={styles.aircraftCarrierContainer}>
          <View style={styles.rotationTip}>{this.renderRotationTip()}</View>
          <Ship
            ship={Ships["1"]}
            disableRotationTip={this.disableRotationTip}
          />
        </View>
        <View style={styles.rows}>
          <Ship
            ship={Ships["3"]}
            disableRotationTip={this.disableRotationTip}
          />
          <Ship
            ship={Ships["4"]}
            disableRotationTip={this.disableRotationTip}
          />
        </View>
      </View>
    );
  }
}
