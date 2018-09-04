import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import styles from "./Styles/MyStatusBarStyle";
import { Colors } from "../../Themes/index";

export default class MyStatusBar extends Component {
  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.background}
        />
      </View>
    );
  }
}
