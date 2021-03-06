import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/PlayerSettingsStyle";
import { Colors } from "../../../Themes/index";

class PlayerSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  render() {
    return this.props.loggedIn ? (
      <View style={styles.container}>
        <View style={styles.userNameContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Change your username (mind. 3 characters)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="New username ..."
            placeholderTextColor={Colors.white}
            autoCapitalize="none"
            onChangeText={username => this.setState({ username })}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              this.props.setUserName({ username: this.state.username });
            }}
            disabled={this.state.username.length < 3}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.deletePlayerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              Do you want to delete your Account?
            </Text>
            <Text style={styles.headerSubtext}>One click here is enough</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              this.props.deletePlayer();
            }}
          >
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}

export default PlayerSettings;
