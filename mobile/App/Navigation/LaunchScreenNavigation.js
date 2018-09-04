import React from "react";
import { createStackNavigator } from "react-navigation";
import LaunchScreen from "../Features/GamesList/Containers/LaunchScreen";
import SetUserName from "../Features/GamesList/Containers/SetUserNameScreen";

import Header from "../Features/Header/Header";
import { Animated, Easing } from "react-native";

const LaunchScreenNavigation = createStackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen
    },
    SetUserName: {
      screen: SetUserName
    }
  },

  {
    headerMode: "screen",
    navigationOptions: ({ navigation, screenProps }) => ({
      header: <Header navigation={navigation} screenProps={screenProps} />,
      swipeEnabled: false,
      initialRoute: LaunchScreen
    }),
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
        useNativeDriver: true
      }
    })
  }
);

export default LaunchScreenNavigation;
