import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/SetUserNameStyle";
import { Colors } from "../../../Themes/index";

class SetUserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username ..."
          placeholderTextColor={Colors.white}
          autoCapitalize="none"
          onChangeText={username => this.setState({ username })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.setUserName({ username: this.state.username });
          }}
          disabled={this.state.username.length < 3}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SetUserName;
