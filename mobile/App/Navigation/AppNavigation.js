import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import LaunchScreenNavigation from "./LaunchScreenNavigation";
import GameScreenStack from "./GameScreenNavigation";
import LeaderboardStack from "./LeaderBoardNavigation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { store } from "../Main/App";
import ManageGameActions from "../Redux/ManageGameRedux";
import styles from "./Styles/NavigationStyles";
import { Colors } from "../Themes";
import LaunchScreen from "../Features/GamesList/Containers/LaunchScreen";
import SettingsStack from "./SettingsNavigation";

// Manifest of possible screens
const PrimaryNav = createBottomTabNavigator(
  {
    LaunchScreenStack: {
      screen: LaunchScreenNavigation
    },
    GameScreenStack: {
      screen: GameScreenStack
    },
    LeaderboardScreen: {
      screen: LeaderboardStack
    },
    SettingsScreen: {
      screen: SettingsStack
    }
  },
  {
    // Default config for all screens
    initialRouteName: "LaunchScreenStack",
    // headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === "SettingsScreen") {
          return <MaterialIcon name="settings" size={25} color={tintColor} />;
        }

        let iconName;
        if (routeName === "LaunchScreenStack") {
          iconName = "home";
        } else if (routeName === "GameScreenStack") {
          iconName = "gamepad";
        } else if (routeName === "LeaderboardScreen") {
          iconName = "trophy";
        }
        return <FontAwesomeIcon name={iconName} size={25} color={tintColor} />;
      },
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.state.routeName === "GameScreenStack") {
          store.dispatch(ManageGameActions.clickOnGameInTabBar());
        } else if (navigation.state.routeName === "LaunchScreenStack") {
          store.dispatch(ManageGameActions.clickOnGamesInTabBar());
        } else {
          defaultHandler();
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.navBarIconActive,
      inactiveTintColor: Colors.navBarIconInactive,
      showLabel: false,
      style: styles.navBar
    },
    animationEnabled: true,
    swipeEnabled: false
  }
);

export default PrimaryNav;
