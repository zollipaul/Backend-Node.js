import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { connect } from "react-redux";
// Styles
import styles from "./Styles/SettingsScreenStyle";
import LeaderboardActions from "../../../Redux/LeaderboardRedux";
import PlayersActions from "../../../Redux/PlayersRedux";
import PlayerSettings from "../Components/PlayerSettings";

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  playerSettings = () => {
    if (this.props.games !== null) {
      return (
        <PlayerSettings
          loggedIn={this.props.games.currentUser !== null}
          setUserName={this.props.setUserName}
          deletePlayer={this.props.deletePlayer}
        />
      );
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {this.playerSettings()}
          <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>
              This app was created in Berlin during a coding bootcamp with a
              React-Native Frontend and a Java-Spring-Boot Backend.
            </Text>
            <Text style={styles.aboutText}>Creator: Paul Zollmann</Text>
            <Text style={styles.aboutText}>
              Email for feedback and/or job offers: pzollmann@gmail.com
            </Text>
            <Text style={styles.aboutText}>Have fun!</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.payload
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserName: data => {
      dispatch(PlayersActions.setUserNameRequest(data));
    },
    deletePlayer: () => {
      dispatch(PlayersActions.deletePlayerRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
