import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Colors } from "../../../Themes/index";

// Styles
import styles from "./Styles/WaitingForOpponentStyleScreen";

class WaitingForOpponentScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Waiting For Opponent</Text>
          <ActivityIndicator size="large" color={Colors.frost} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  WaitingForOpponentScreen
);
