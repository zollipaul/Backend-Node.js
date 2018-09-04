import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ManageGameActions from "../../../Redux/ManageGameRedux";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles/PlayButtonStyle";

class PlayButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.fiveShipsReached ? (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.startGame()}
        >
          <Text style={styles.buttonText}>Play now!</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    fiveShipsReached: state.ships.counter === 5
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: () => {
      dispatch(ManageGameActions.startGameRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton);
