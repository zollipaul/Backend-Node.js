import React, { Component } from "react";
import { View } from "react-native";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import { connect } from "react-redux";
import StartupActions from "../Redux/StartupRedux";
import ReduxPersist from "../Config/ReduxPersist";
import MyStatusBar from "../Features/Header/MyStatusBar";

// Styles
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
  componentDidMount() {
    console.log("copmonent did mount root");

    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      console.log("reduxPersistNotActive");
      this.props.startup();
    }
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <MyStatusBar />
        <ReduxNavigation />
      </View>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
