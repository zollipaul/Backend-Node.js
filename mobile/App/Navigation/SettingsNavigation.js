import React from "react";
import { createStackNavigator } from "react-navigation";
import Header from "../Features/Header/Header";
import SettingsScreen from "../Features/Settings/Containers/SettingsScreen";

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen
    }
  },
  {
      headerMode: "screen",
      navigationOptions: ({ navigation }) => ({
      header: <Header navigation={navigation} />
    })
  }
);

export default SettingsStack;
