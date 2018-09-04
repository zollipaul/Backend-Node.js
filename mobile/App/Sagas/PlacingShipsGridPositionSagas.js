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

import { call, put } from "redux-saga/effects";
import PlacingShipsGridPositionActions from "../Redux/PlacingShipsGridPositionRedux";
// import { PlacingShipsGridPositionSelectors } from '../Redux/PlacingShipsGridPositionRedux'
import { StatusBar, Platform } from "react-native";

export function* getPlacingShipsGridY() {
  const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

  // height of MyStatusBar and header components
  const py = STATUSBAR_HEIGHT + 45;
  yield put(PlacingShipsGridPositionActions.postGameGridY(py));
}
