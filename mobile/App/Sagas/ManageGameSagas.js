/************************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put, select, take, all } from "redux-saga/effects";
import ManageGameActions from "../Redux/ManageGameRedux";
import GamesActions from "../Redux/GamesRedux";
import { GameViewSelectors } from "../Redux/GameViewRedux";
import { GamesSelectors } from "../Redux/GamesRedux";
import { NavigationActions } from "react-navigation";
import GameViewActions from "../Redux/GameViewRedux";
import ShipsActions from "../Redux/ShipsRedux";
import SalvoActions from "../Redux/SalvoRedux";
import ShipsToArray from "../Transforms/ShipsToArray";
import SalvoesToObject from "../Transforms/SalvoesToObject";

import { ManageGameReduxSelectors } from "../Redux/ManageGameRedux";
import { Alert } from "react-native";

export function* createGame(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(GamesSelectors.getData)
  // make the call to the api

  const response = yield call(api.createGame, data);
  console.log(response);

  // success?
  if (response.ok) {
    yield put(ManageGameActions.createGameSuccess(response.data));
    yield call(controller, response.data.gamePlayerId);
  } else {
    if (response.data.error === "fiveGamesReached") {
      Alert.alert(
        "You have more than five active games, so you can't join or create new games."
      );
    }
    yield put(ManageGameActions.createGameFailure());
  }
}

export function* changeGame(action) {
  const { payload } = action;
  yield call(controller, payload);
}

export function* joinGame(api, action) {
  const { data } = action;
  const response = yield call(api.joinGame, data);
  // success?
  if (response.ok) {
    yield put(ManageGameActions.joinGameSuccess(response.data));
    yield call(controller, response.data.gamePlayerId);
  } else {
    if (response.data.error === "fiveGamesReached") {
      Alert.alert(
        "You have more than five active games, so you can't join or create new games."
      );
    }
    yield put(ManageGameActions.joinGameFailure());
  }
}

export function* startGame(api) {
  const ships = yield select(ManageGameReduxSelectors.getShips);
  const gamePlayerId = yield select(GameViewSelectors.getGamePlayerId);
  const shipsArray = ShipsToArray(ships);

  const response = yield call(api.postShips, gamePlayerId, shipsArray);
  // success?
  if (response.ok) {
    yield put(ManageGameActions.startGameSuccess(response.data));
    yield call(controller, gamePlayerId);
  } else {
    yield put(ManageGameActions.startGameFailure());
  }
}

export function* postSalvoes(api) {
  const salvoes = yield select(ManageGameReduxSelectors.getSalvoes);
  const turn = yield select(GameViewSelectors.getTurn);
  // convert to object for java backend
  const salvoObject = SalvoesToObject(turn, salvoes);
  const gamePlayerId = yield select(GameViewSelectors.getGamePlayerId);
  const response = yield call(api.postSalvoes, gamePlayerId, salvoObject);
  if (response.ok) {
    yield put(ManageGameActions.postSalvoesSuccess(response.data));
    yield put(GameViewActions.gameViewRequest(gamePlayerId));
  } else {
    yield put(ManageGameActions.postSalvoesFailure());
  }
}

export function* controller(gamePlayerId) {
  yield put(NavigationActions.navigate({ routeName: "Loading" }));
  yield put(GameViewActions.gameViewRequest(gamePlayerId));
  const gameView = yield take("GAME_VIEW_SUCCESS");
  yield call(navigation, gameView.payload.stage);
}

export function* navigation(stage) {
  if (stage === "placingShips") {
    yield put(NavigationActions.navigate({ routeName: "PlacingShipsScreen" }));
    yield put(ShipsActions.resetAllShips());

  } else if (
    stage === "waitingForJoiningOpponent" ||
    stage === "waitingForPlacingShipsOfOpponent"
  ) {
    yield put(
      NavigationActions.navigate({ routeName: "WaitingForOpponentScreen" })
    );
  } else {
    yield put(NavigationActions.navigate({ routeName: "GamePlayScreen" }));
    yield put(SalvoActions.resetAllSalvoes());
  }
}
