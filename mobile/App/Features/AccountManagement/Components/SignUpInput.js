import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./Styles/SignUpInputStyle";
import { Colors } from "../../../Themes/index";

import errors from "./errors/errors";

export default class SignUpInput extends Component {
  errorMessage = () => {
    if (this.props.showErrorMessage) {
      return <Text style={styles.errorMessage}>{errors[this.props.type].message}</Text>;
    }
  };

  render() {
    return (
      <View>
        <TextInput
          style={[
            styles.input,
            this.props.showErrorBorder ? styles.errorBorder : null
          ]}
          placeholder={this.props.placeholder}
          placeholderTextColor={Colors.white}
          autoCapitalize="none"
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
        />
        {this.errorMessage()}
      </View>
    );
  }
}
