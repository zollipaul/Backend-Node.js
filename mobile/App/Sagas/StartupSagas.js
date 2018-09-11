import { put, call, select } from "redux-saga/effects";
import { getPlacingShipsGridY } from "./PlacingShipsGridPositionSagas";
import { autoLogin } from "./SocialAuthSagas";

import { SocialAuthSelectors } from "../Redux/SocialAuthRedux";
import ShipsActions from "../Redux/ShipsRedux";
import SalvoActions from "../Redux/SalvoRedux";
import GameViewActions from "../Redux/GameViewRedux";
import TokenActions from "../Redux/TokenRedux";

// process STARTUP actions
export function* startup(action) {
  yield call(getPlacingShipsGridY);
  yield put(TokenActions.setTokenFromStore());
  const authType = yield select(SocialAuthSelectors.getAuthType);
  if (authType) {
    yield call(autoLogin);
  }

  yield put(GameViewActions.resetGameView());
  yield put(ShipsActions.resetAllShips());
  yield put(SalvoActions.resetAllSalvoes());
  console.log("startup");
}
