import React, { PureComponent } from "react";
import { View, Text } from "react-native";

// Styles
import styles from "./Styles/GameTabNoActiveGameStyle";

export default class GameTabNoActiveGame extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Choose a game</Text>
        <Text style={styles.text}>or create a new game!</Text>
      </View>
    );
  }
}
