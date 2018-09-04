import { call, put, take, fork, cancel, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import GameViewActions from "../Redux/GameViewRedux";
import ConvertGameViewData from "../Transforms/ConvertGameViewData";
import { GameViewSelectors } from "../Redux/GameViewRedux";
import { navigation } from "./ManageGameSagas";

export function* getGameView(api, action) {
  const { data } = action;
  const response = yield call(api.getGameView, data);
  // success?
  if (response.ok) {
    let gameView = response.data;
    // transform
    gameView.gameGrids = ConvertGameViewData(gameView);
    yield put(GameViewActions.gameViewSuccess(gameView));
  } else {
    yield put(GameViewActions.gameViewFailure());
  }
}

export function* backgroundSync(api, gamePlayerId) {
  while (true) {
    yield call(delay, 5000);
    const response = yield call(api.getGameView, gamePlayerId);
    const prevGameView = yield select(GameViewSelectors.getGameView);
    let gameView = response.data;

    // success?
    if (response.ok) {
      if (prevGameView.payload === null) {
        gameView.gameGrids = ConvertGameViewData(response.data);
        yield put(GameViewActions.gameViewSuccess(gameView));
      } else {
        const prevStage = prevGameView.payload.stage;

        // update gameView
        if (prevGameView.payload.salvoes.length !== gameView.salvoes.length) {
          gameView.gameGrids = ConvertGameViewData(response.data);
          yield put(GameViewActions.gameViewSuccess(gameView));

          // update gameView and navigate
        } else if (
          (prevStage === "waitingForJoiningOpponent" ||
            prevStage === "waitingForPlacingShipsOfOpponent") &&
          gameView.game.stage === "placingSalvoes"
        ) {
          gameView.gameGrids = ConvertGameViewData(response.data);
          yield put(GameViewActions.gameViewSuccess(gameView));
          yield call(navigation, gameView.stage);
        }
      }
    } else {
      yield put(GameViewActions.gameViewFailure());
    }
  }
}

export function* gameViewSyncManager(api) {
  while (true) {
    const action = yield take("GAME_VIEW_SUCCESS");
    console.log("start Game View Sync");
    const stage = action.payload.stage;
    const gamePlayerId = action.payload.id;
    if (stage !== "gameOver") {
      const task = yield fork(backgroundSync, api, gamePlayerId);
      yield take([
        "JOIN_GAME_SUCCESS",
        "CHANGE_GAME",
        "CREATE_GAME_SUCCESS",
        "LOGOUT_PLAYER_SUCCESS",
        "STOP_GAME_VIEW_SYNC"
      ]);

      console.log("cancel Game View Sync");

      yield cancel(task);
    }
  }
}

// todo refactor this
//
// function* updateGameView(api) {
//
// }
//
