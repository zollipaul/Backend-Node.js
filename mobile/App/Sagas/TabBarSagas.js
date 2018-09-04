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

import { call, put, select } from "redux-saga/effects";
import GamesActions from "../Redux/GamesRedux";
import { GameViewSelectors } from "../Redux/GameViewRedux";
import { GamesSelectors } from "../Redux/GamesRedux";
import { NavigationActions } from "react-navigation";
import GameViewActions from "../Redux/GameViewRedux";
import { controller } from "./ManageGameSagas";

export function* clickOnGameInTabBar() {
  const gameView = yield select(GameViewSelectors.getGameView);
  const games = yield select(GamesSelectors.getGames);
  yield put(GamesActions.stopGamesSync());

  if (games === null) {
    yield put(NavigationActions.navigate({ routeName: "Loading" }));
  } else if (games.currentUser === null) {
    yield put(NavigationActions.navigate({ routeName: "GameTabLoggedOut" }));
  } else if (gameView.payload === null) {
    yield put(NavigationActions.navigate({ routeName: "GameTabNoActiveGame" }));
  } else {
    const gamePlayerId = yield select(GameViewSelectors.getGamePlayerId);
    yield call(controller, gamePlayerId);
  }
}

export function* clickOnGamesInTabBar() {
  yield put(NavigationActions.navigate({ routeName: "LaunchScreen" }));
  yield put(GamesActions.startGamesSync());
  yield put(GameViewActions.stopGameViewSync());
}
