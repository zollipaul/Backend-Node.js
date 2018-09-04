import React, { PureComponent } from "react";
import {
  SectionList,
  Text,
  View,
  Linking,
  Platform,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import GameListItem from "../Components/GameListItem";
import PlayersActions from "../../../Redux/PlayersRedux";
import ManageGameActions from "../../../Redux/ManageGameRedux";
import TokenActions from "../../../Redux/TokenRedux";
import GamesActions from "../../../Redux/GamesRedux";
import GeolocationActions from "../../../Redux/GeolocationRedux";
import LoginAndSignUp from "../Components/LoginAndSignUp";
import Loading from "../../Waiting/Components/Loading";
import SortByLocationButton from "../Components/SortByLocationButton";
import CreateGameButton from "../Components/CreateGameButton";
import styles from "./Styles/LaunchScreenStyles";
import SafariView from "react-native-safari-view";
import AppConfig from "../../../Config/AppConfig";

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class LaunchScreen extends PureComponent {
  /************************************************************
   * STEP 1
   * This is an array of objects with the properties you desire
   * Usually this should come from Redux mapStateToProps
   *************************************************************/

  constructor(props) {
    super(props);
  }

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener("url", this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then(url => {
      if (url) {
        console.log(url);
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener("url", this.handleOpenURL);
  }

  handleOpenURL = event => {
    const token = this.getParameterByName("token", event.url);
    this.props.putToken(token);
    this.props.manageLogin();
  };
  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL(AppConfig.server + "login/facebook");

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL(AppConfig.server + "login/google");

  // Open URL in a browser
  openURL = url => {
    // Use SafariView on iOS
    if (Platform.OS === "ios") {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  getParameterByName = (name, url) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  /************************************************************
   * STEP 2
   * `renderRow` function. How each cell/row should be rendered
   * It's our best practice to place a single component here:
   *
   * e.g.
   return <MyCustomCell title={item.title} description={item.description} />
   *************************************************************/

  renderSectionHeader = ({ section }) => {
    switch (section.key) {
      case "ongoingGames":
        if (section.data.length !== 0)
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>Ongoing</Text>
            </View>
          );
        break;
      case "joinableGames":
        if (section.data.length !== 0)
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>Join</Text>
              <SortByLocationButton
                postGeolocation={this.props.postGeolocation}
                getGames={this.props.getGames}
              />
            </View>
          );
        break;
      case "gameOverGames":
        if (section.data.length !== 0)
          return (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>Game Over</Text>
            </View>
          );
        break;
      default:
        return (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Current games</Text>
          </View>
        );
    }
  };

  renderRow = ({ item }) => {
    return (
      <GameListItem
        turn={item.turn}
        id={item.id}
        created={item.created}
        gamePlayers={item.gamePlayers}
        stage={item.stage}
        distance={item.distance}
        winner={item.winner}
        currentUser={this.props.games.currentUser}
        changeGame={this.props.changeGame}
        joinGame={this.props.joinGame}
      />
    );
  };

  /************************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/

  // Render a footer?
  renderFooter = () => (
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>
  );

  // Show this when data is empty
  renderEmpty = () => (
    <Text style={styles.label}> - Nothing to See Here - </Text>
  );

  renderSeparator = () => <Text style={styles.label}> ~~~~~ </Text>;

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = item => String(item.id);

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20;

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  createGameButton = () => {
    if (this.props.games.currentUser !== null) {
      return (
        <CreateGameButton
          createGame={this.props.createGame}
          postGeolocation={this.props.postGeolocation}
        />
      );
    }
  };

  loginAndSignUp = () => {
    if (this.props.games.currentUser === null) {
      return (
        <LoginAndSignUp
          login={this.login}
          signUp={this.signUp}
          loginWithFacebook={this.loginWithFacebook}
          loginWithGoogle={this.loginWithGoogle}
        />
      );
    }
  };

  render() {
    return this.props.games !== null ? (
      <View style={styles.container}>
        {this.loginAndSignUp()}
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          sections={this.props.games.games}
          contentContainerStyle={styles.listContent}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
        />
        {this.createGameButton()}
      </View>
    ) : (
      <Loading />
    );
  }

  login = (userName, password) => {
    this.props.loginPlayer({ userName: userName, password: password });
  };

  signUp = (userName, password) => {
    this.props.signUpPlayer({ userName: userName, password: password });
  };
}

const mapStateToProps = state => {
  return {
    games: state.games.payload
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createGame: () => {
      dispatch(ManageGameActions.createGameRequest());
    },
    joinGame: data => {
      dispatch(ManageGameActions.joinGameRequest(data));
    },
    changeGame: payload => {
      dispatch(ManageGameActions.changeGame(payload));
    },
    loginPlayer: data => {
      dispatch(PlayersActions.loginPlayerRequest(data));
    },
    signUpPlayer: data => {
      dispatch(PlayersActions.signUpPlayerRequest(data));
    },
    loginFacebook: () => {
      dispatch(PlayersActions.loginFacebookRequest());
    },
    loginGoogle: () => {
      dispatch(PlayersActions.loginGoogleRequest());
    },
    getGames: () => {
      dispatch(GamesActions.getGamesRequest());
    },
    postGeolocation: data => {
      dispatch(GeolocationActions.postGeolocationRequest(data));
    },
    putToken: data => {
      dispatch(TokenActions.setToken(data));
    },
    manageLogin: () => {
      dispatch(PlayersActions.manageLogin());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
