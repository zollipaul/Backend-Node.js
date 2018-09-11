import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles/LoginAndSignUpStyle";
import { Colors } from "../../../Themes/index";
import PlayersActions from "../../../Redux/PlayersRedux";
import SocialAuthActions from "../../../Redux/SocialAuthRedux";

import { GoogleSignin, statusCodes } from "react-native-google-signin";
import connect from "react-redux/es/connect/connect";
import {put} from "../../../../node_modules/redux-saga/effects";
import {NavigationActions} from "react-navigation";

class LoginAndSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  login = (userName, password) => {
    this.props.loginPlayer({ username: userName, password: password });
  };

  // Somewhere in your code
  signIn = async () => {
     this.props.navigation.navigate({ routeName: "Loading" });

      try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = userInfo;
      this.props.socialLogin("google", accessToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

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
                this.login(this.state.userName, this.state.password)
              }
            >
              <Text style={styles.buttonText}>Login </Text>
            </TouchableOpacity>
            <View style={styles.orText}>
              <Text style={styles.buttonText}>or</Text>
            </View>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            <Text style={styles.buttonText}>Login with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginPlayer: data => {
      dispatch(PlayersActions.loginPlayerRequest(data));
    },
    loginFacebook: () => {
      dispatch(PlayersActions.loginFacebookRequest());
    },
    loginGoogle: data => {
      dispatch(PlayersActions.loginGoogleRequest(data));
    },
    socialLogin: (authType, authToken) => {
      dispatch(SocialAuthActions.socialLogin(authType, authToken));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginAndSignUp);
