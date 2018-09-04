import React, { Component } from "react";
import { View, Text, ActivityIndicator} from "react-native";
import styles from "./Styles/LoadingStyles";
import { Colors } from '../../../Themes'

export default class Loading extends Component {
  render() {
      console.log("loading");
      return (
      <View style={styles.container}>
        {/*<Text style={styles.text}>Loading</Text>*/}
        {/*<Text style={styles.text}>to server!</Text>*/}
        <ActivityIndicator size="large" color={Colors.activityIndicator} style={styles.activityIndicator}/>
      </View>
    );
  }
}
