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
import GeolocationActions from "../Redux/GeolocationRedux";
import GamesActions from "../Redux/GamesRedux";
import Permissions from 'react-native-permissions'

export function* postGeolocation(api, action) {
  const { data } = action;
  if (data === "reset") {
    const response = yield call(api.postGeolocation, "reset", {});
    // success?
    if (response.ok) {
      yield put(GeolocationActions.postGeolocationSuccess(response.data));
      yield put(GamesActions.getGamesRequest());
    } else {
      yield put(GeolocationActions.postGeolocationFailure());
    }
  } else {
    const location = yield call(getUserLocation);
    const response = yield call(api.postGeolocation, "update", {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
    // success?
    if (response.ok) {
      yield put(GeolocationActions.postGeolocationSuccess(response.data));
      yield put(GamesActions.getGamesRequest());
    } else {
      yield put(GeolocationActions.postGeolocationFailure());
    }
  }
}

const options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

const getUserLocation = () =>
  new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      location => resolve(location),
      null,
      options
    );
  });


export function* updateGeoLocation() {
  const response = yield Permissions.check("location");
  if (response === "authorized") {
    yield put(GeolocationActions.postGeolocationRequest());
  }
}

