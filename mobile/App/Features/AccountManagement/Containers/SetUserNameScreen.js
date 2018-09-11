import React, { PureComponent } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles/SetUserNameScreenStyle";
import PlayersActions from "../../../Redux/PlayersRedux";
import { connect } from "react-redux";
import SetUserName from "../Components/SetUserName";

class SetUserNameScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>What is your username?</Text>
          <Text style={styles.headerSubtext}>(min. 3 characters)</Text>
        </View>
        <SetUserName
        setUserName={this.props.setUserName}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setUserName: data => {
      dispatch(PlayersActions.setUserNameRequest(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(SetUserNameScreen);
