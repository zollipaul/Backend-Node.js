import { put, call } from "redux-saga/effects";
import { getPlacingShipsGridY } from "./PlacingShipsGridPositionSagas";
import GamesActions from "../Redux/GamesRedux";
import ShipsActions from "../Redux/ShipsRedux";
import SalvoActions from "../Redux/SalvoRedux";
import GameViewActions from "../Redux/GameViewRedux";
import TokenActions from "../Redux/TokenRedux";

import { updateGeoLocation } from "./GeolocationSagas";

// // exported to make available for tests
// export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function* startup(action) {
  yield call(getPlacingShipsGridY);
  yield put(TokenActions.setTokenFromStore());
  yield put(GameViewActions.resetGameView());
  yield put(ShipsActions.resetAllShips());
  yield put(SalvoActions.resetAllSalvoes());
  console.log("startup");
}
