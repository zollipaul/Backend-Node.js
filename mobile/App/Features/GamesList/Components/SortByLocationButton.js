import React, { PureComponent } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import styles from "./Styles/SortByLocationButtonStyle";
import Permissions from "react-native-permissions";

export default class SortByLocationButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      locationPermission: "authorized"
    };
  }

  componentDidMount() {
    Permissions.check("location").then(response => {
      this.setState({ locationPermission: response });
    });
  }

  render() {
    return this.state.locationPermission !== "authorized" ? (
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => {
          Permissions.check("location").then(response => {
            if (response === "denied") {
              Alert.alert(
                "You have to enable location services in your settings to sort by location!"
              );
              this.props.postGeolocation("reset");
              this.setState({ locationPermission: response });
            } else if (response === "undetermined") {
              Permissions.request("location").then(response => {
                if (response === "authorized") {
                  this.props.postGeolocation();
                }
                else {
                  this.props.postGeolocation("reset");
                }
                this.setState({ locationPermission: response });
              });
            } else if (response === "authorized") {
              this.props.postGeolocation();
              this.setState({ locationPermission: response });
            }
            this.props.getGames()
          });
        }}
      >
        <Text style={styles.buttonText}>Sort by location</Text>
      </TouchableOpacity>
    ) : null;
  }
}
