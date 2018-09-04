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

import { call, select, put } from "redux-saga/effects";
import { TokenSelectors } from "../Redux/TokenRedux";
import GamesActions from "../Redux/GamesRedux";

export function* setToken(api, action) {
  const { payload } = action;
  api.setToken(payload);
}

export function* clearToken(api) {
  api.clearToken();
}

export function* setTokenFromStore(api) {
  const token = yield select(TokenSelectors.getToken);
  if (token !== null) {
    api.setToken(token);
  }
  yield put(GamesActions.getGamesRequest());
}
