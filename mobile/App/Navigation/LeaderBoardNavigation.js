import React from "react";
import { createStackNavigator } from "react-navigation";
import Header from "../Features/Header/Header";
import LeaderboardScreen from "../Features/Leaderboard/LeaderboardScreen";

const LeaderboardStack = createStackNavigator(
  {
    LeaderboardScreen: {
      screen: LeaderboardScreen
    }
  },
  {
      headerMode: "screen",
      navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  }
);

export default LeaderboardStack;
