import React, { PureComponent } from "react";
import { Alert, TouchableOpacity } from "react-native";
import styles from "./Styles/CreateGameButtonStyle";
import { Colors } from "../../../Themes";
import Icon from "react-native-vector-icons/FontAwesome";
import Permissions from "react-native-permissions";

export default class CreateGameButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.createGame();
          Permissions.check("location").then(response => {
            if (response === "undetermined") {
              Permissions.request("location").then(response => {
                if (response === "authorized") {
                  this.props.postGeolocation();
                } else {
                  this.props.postGeolocation("reset");
                }
              });
            } else if (response === "authorized") {
              this.props.postGeolocation();
            }
          });
        }}
        style={styles.createButton}
      >
        <Icon
          name="plus"
          size={30}
          color={Colors.white}
          style={styles.iconPositionCorrected}
        />
      </TouchableOpacity>
    );
  }
}
