import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import styles from "./Styles/GameTabLoggedOutStyle";

export default class NoLoginOrNoActiveGame extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You need to login</Text>
        <Text style={styles.text}>or sign up to play a game!</Text>
      </View>
    );
  }
}

