import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/LoginAndSignUpStyle";
import { Colors } from "../../../Themes/index";

class LoginAndSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
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
        <TextInput
          style={styles.input}
          placeholder="Password ..."
          placeholderTextColor={Colors.white}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <View style={styles.buttons}>
          <View style={styles.loginOrSignUp}>
            <TouchableOpacity
              style={styles.login}
              onPress={() =>
                this.props.login(this.state.userName, this.state.password)
              }
            >
              <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <View style={styles.orText}>
              <Text style={styles.buttonText}>or</Text>
            </View>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() =>
                this.props.signUp(this.state.userName, this.state.password)
              }
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/*<TouchableOpacity*/}
          {/*style={styles.button}*/}
          {/*onPress={() => this.props.loginWithFacebook()}*/}
          {/*>*/}
          {/*<Text style={styles.buttonText}>Login with Facebook</Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.loginWithGoogle()}
          >
            <Text style={styles.buttonText}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginAndSignUp;
