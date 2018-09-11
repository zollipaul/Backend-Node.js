import { takeLatest, all, takeEvery } from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";

/* ------------- Types ------------- */

import { StartupTypes } from "../Redux/StartupRedux";
import { PlayersTypes } from "../Redux/PlayersRedux";
import { GamesTypes } from "../Redux/GamesRedux";
import { GeolocationTypes } from "../Redux/GeolocationRedux";
import { TokenTypes } from "../Redux/TokenRedux";
import { SocialAuthTypes } from "../Redux/SocialAuthRedux";
import { GameViewTypes } from "../Redux/GameViewRedux";
import { LeaderboardTypes } from "../Redux/LeaderboardRedux";
import { ManageGameTypes } from "../Redux/ManageGameRedux";
import { TabBarTypes } from "../Redux/TabBarRedux";

/* ------------- Sagas ------------- */

// workers sagas
import { startup } from "./StartupSagas";
import {
  getPlayers,
  loginPlayer,
  loginFacebook,
  loginGoogle,
  logoutPlayer,
  signUpPlayer,
  deletePlayer,
  setUserName,
  manageLogin
} from "./PlayerSagas";
import { gamesSyncManager, getGames } from "./GamesSagas";
import { getGameView, gameViewSyncManager } from "./GameViewSagas";
import { getLeaderboard } from "./LeaderboardSagas";
import { postGeolocation } from "./GeolocationSagas";
import { setToken, clearToken, setTokenFromStore } from "./TokenSagas";
import { socialLogin, getMe } from "./SocialAuthSagas";

import { clickOnGameInTabBar, clickOnGamesInTabBar } from "./TabBarSagas";
import {
  createGame,
  changeGame,
  joinGame,
  startGame,
  postSalvoes
} from "./ManageGameSagas";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

// watchers sagas
export default function* root() {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.STARTUP, gamesSyncManager, api),

    takeLatest(GamesTypes.GET_GAMES_REQUEST, getGames, api),
    takeLatest(GamesTypes.GET_GAMES_REQUEST_LOADING, getGames, api),

    takeLatest(GeolocationTypes.POST_GEOLOCATION_REQUEST, postGeolocation, api),

    takeLatest(TokenTypes.SET_TOKEN, setToken, api),
    takeLatest(TokenTypes.CLEAR_TOKEN, clearToken, api),
    takeLatest(TokenTypes.SET_TOKEN_FROM_STORE, setTokenFromStore, api),

      takeLatest(SocialAuthTypes.GET_ME_REQUEST, getMe, api),
      takeLatest(SocialAuthTypes.SOCIAL_LOGIN, socialLogin, api),

    takeLatest(PlayersTypes.GET_PLAYERS_REQUEST, getPlayers, api),
    takeLatest(PlayersTypes.LOGIN_PLAYER_REQUEST, loginPlayer, api),
    takeLatest(PlayersTypes.LOGIN_FACEBOOK_REQUEST, loginFacebook, api),
    takeLatest(PlayersTypes.LOGIN_GOOGLE_REQUEST, loginGoogle, api),
    takeLatest(PlayersTypes.SET_USER_NAME_REQUEST, setUserName, api),
    takeLatest(PlayersTypes.LOGOUT_PLAYER_REQUEST, logoutPlayer, api),
    takeLatest(PlayersTypes.SIGN_UP_PLAYER_REQUEST, signUpPlayer, api),
    takeLatest(PlayersTypes.DELETE_PLAYER_REQUEST, deletePlayer, api),

    takeLatest(PlayersTypes.MANAGE_LOGIN, manageLogin, api),

    takeLatest(ManageGameTypes.CREATE_GAME_REQUEST, createGame, api),
    takeEvery(ManageGameTypes.CHANGE_GAME, changeGame),
    takeLatest(ManageGameTypes.JOIN_GAME_REQUEST, joinGame, api),
    takeLatest(ManageGameTypes.START_GAME_REQUEST, startGame, api),
    takeEvery(TabBarTypes.CLICK_ON_GAME_IN_TAB_BAR, clickOnGameInTabBar),
    takeEvery(TabBarTypes.CLICK_ON_GAMES_IN_TAB_BAR, clickOnGamesInTabBar),

    takeLatest(GameViewTypes.GAME_VIEW_REQUEST, getGameView, api),
    // takeLatest(GameViewTypes.GAME_VIEW_SYNC_REQUEST, getGameView, api),

    takeLatest(LeaderboardTypes.LEADERBOARD_REQUEST, getLeaderboard, api),

    takeLatest(ManageGameTypes.POST_SALVOES_REQUEST, postSalvoes, api),

    // start background sync
    takeLatest(
      [
        ManageGameTypes.JOIN_GAME_SUCCESS,
        ManageGameTypes.CHANGE_GAME,
        ManageGameTypes.CREATE_GAME_SUCCESS
      ],
      gameViewSyncManager,
      api
    )
  ]);
}
