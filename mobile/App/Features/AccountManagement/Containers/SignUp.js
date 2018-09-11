import React, { Component } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles/SignUpStyle";
import PlayersActions from "../../../Redux/PlayersRedux";
import { connect } from "react-redux";
import Ajv from "ajv";
import newUserSchema from "./schema/newUser";
import SignUpInput from "../Components/SignUpInput";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordControl: "",
      error: null
    };
  }

  componentDidMount() {
    this._ajv = new Ajv();
  }

  setError = dataPath => {
    // slice the "." from dataPath
    this.setState({ error: dataPath.slice(1) });
  };

  signUp = () => {
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    const valid = this._ajv.validate(newUserSchema, newUser);
    if (!valid) {
      this.setError(this._ajv.errors[0].dataPath);
    } else if (this.state.password !== this.state.passwordControl) {
      this.setState({ error: "notSamePassword" });
    } else {
      this.setState({ error: null });
      this.props.signUpPlayer(newUser);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Create a free account</Text>
        <SignUpInput
          type={"username"}
          showErrorBorder={this.state.error === "username"}
          showErrorMessage={this.state.error === "username"}
          placeholder={"Username ..."}
          onChangeText={username => this.setState({ username })}
        />
        <SignUpInput
          type={"email"}
          showErrorBorder={this.state.error === "email"}
          showErrorMessage={this.state.error === "email"}
          placeholder={"Email ..."}
          onChangeText={email => this.setState({ email })}
        />
        <SignUpInput
          type={"password"}
          showErrorBorder={
            this.state.error === "password" ||
            this.state.error === "notSamePassword"
          }
          showErrorMessage={this.state.error === "password"}
          placeholder={"Password ..."}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <SignUpInput
          type={"notSamePassword"}
          showErrorBorder={this.state.error === "notSamePassword"}
          showErrorMessage={this.state.error === "notSamePassword"}
          placeholder={"Confirm password  ..."}
          secureTextEntry={true}
          onChangeText={passwordControl => this.setState({ passwordControl })}
        />
        <TouchableOpacity style={styles.signUp} onPress={this.signUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpPlayer: data => {
      dispatch(PlayersActions.signUpPlayerRequest(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
