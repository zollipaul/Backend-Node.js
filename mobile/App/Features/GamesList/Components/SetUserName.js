import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/SetUserNameStyle";
import { Colors } from "../../../Themes/index";

class SetUserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
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
          onChangeText={userName => this.setState({ userName })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.setUserName({ userName: this.state.userName });
          }}
          disabled={this.state.userName.length < 5}
        >
          <Text style={styles.buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SetUserName;
