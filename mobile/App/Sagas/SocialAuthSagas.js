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

import { call, select, put, take } from "redux-saga/effects";
import { SocialAuthSelectors } from "../Redux/SocialAuthRedux";
import SocialAuthActions from "../Redux/SocialAuthRedux";
import PlayerActions from "../Redux/PlayersRedux";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { create } from "apisauce";

const googleApi = create({
  baseURL: "https://www.googleapis.com/userinfo/v2/"
});

export function* socialLogin(api, action) {
  const { authType, authToken } = action;
  yield put(SocialAuthActions.getMeRequest(authToken));
  const response = yield take("GET_ME_SUCCESS");
  const body = {
    userId: response.me.id,
    token: authToken
  };
  yield put(PlayerActions.loginGoogleRequest(body));
}

export function* autoLogin() {
  try {
    const { accessToken, user } = yield call(GoogleSignin.signInSilently);
    const body = {
      userId: user.id,
      token: accessToken
    };
    yield put(PlayerActions.loginGoogleRequest(body));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
    } else {
      // some other error
    }
  }
}

export function* getMe(api, action) {
  let { authToken } = action;
  googleApi.setHeader("Authorization", `Bearer ${authToken}`);
  const response = yield call(() => googleApi.get("me"));
  console.log(response);
  if (response.ok) {
    yield put(SocialAuthActions.getMeSuccess(response.data));
  } else {
    yield put(SocialAuthActions.getMeFailure());
  }
}
