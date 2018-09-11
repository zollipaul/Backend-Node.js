import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PlayersActions from "../../Redux/PlayersRedux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Styles
import styles from "./Styles/HeaderStyle";
import { Colors } from "../../Themes/index";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderTitleOfGameScreens = () => {
    const gamePlayers = this.props.gameView.payload.game.gamePlayers;
    const gamePlayer2 = gamePlayers[1] ? (
      <Text style={styles.titleText}>{gamePlayers[1].player.userName} </Text>
    ) : (
      <Text style={styles.titleText}>No one yet...</Text>
    );

    return (
      <Text style={styles.titleText}>
        {gamePlayers[0].player.userName} vs {gamePlayer2}
      </Text>
    );
  };

  render() {
    const routeName = this.props.navigation.state.routeName.valueOf();
    // console.log(routeName)

    if (this.props.games !== null) {
      // Logged out
      if (
        routeName === "LaunchScreen" &&
        this.props.games.currentUser === null
      ) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Games</Text>
            </View>
          </View>
        );
      }

      // Logged in, AllGamesTab
      if (routeName === "LaunchScreen" && this.props.games.currentUser) {
        return (
          <View style={styles.headerLoggedIn}>
            <View style={styles.userView}>
              <Text style={styles.headerUser}>
                {this.props.games.currentUser.userName}
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Games</Text>
            </View>
            <View style={styles.logoutView}>
              <TouchableOpacity onPress={() => this.props.logout()}>
                <Icon name={"logout"} size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      // SignUp
      if (routeName === "SignUp") {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Register</Text>
            </View>
          </View>
        );
      }

      // Logged in, GameTab
      if (routeName === "Loading" && this.props.games.currentUser) {
        return (
          <View style={styles.headerLoggedIn}>
            <View style={styles.userView}>
              <Text style={styles.headerUser}>
                {this.props.games.currentUser.userName}
              </Text>
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Game</Text>
            </View>
            <View style={styles.logoutView}>
              <TouchableOpacity onPress={() => this.props.logout()}>
                <Icon name={"logout"} size={30} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      if (routeName === "PlacingShipsScreen" && this.props.gameView.payload) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {this.renderTitleOfGameScreens()}
              </Text>
            </View>
          </View>
        );
      }

      if (routeName === "GamePlayScreen" && this.props.gameView.payload) {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {this.renderTitleOfGameScreens()}
              </Text>
            </View>
          </View>
        );
      }

      if (routeName === "LeaderboardScreen") {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Leaderboard</Text>
            </View>
          </View>
        );
      }
      if (routeName === "SettingsScreen") {
        return (
          <View style={styles.headerLoggedOutOrPlacingShipsOrGamePlay}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>Settings</Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.payload,
    gameView: state.gameView
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(PlayersActions.logoutPlayerRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
