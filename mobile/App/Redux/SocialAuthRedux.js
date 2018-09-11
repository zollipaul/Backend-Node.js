import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  socialLogin: ["authType", "authToken"],
  clearSocialAuth: null,

  getMeRequest: ["authToken"],
  getMeSuccess: ["me"],
  getMeFailure: null
});

export const SocialAuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authType: null,
  authToken: null,
  me: null,

  error: null,
  fetching: null
});

/* ------------- Selectors ------------- */

export const SocialAuthSelectors = {
  getAuthToken: state => state.socialAuth.authToken,
  getAuthType: state => state.socialAuth.authType
};

/* ------------- Reducers ------------- */

export const socialLogin = (state, action) => {
  const { authType, authToken } = action;
  return state.merge({ authType, authToken });
};

export const clearSocialAuth = state => {
  return state.merge({ authType: null, authToken: null, me: null });
};

// request the data from an api
export const request = (state, { authToken }) =>
  state.merge({ fetching: true, authToken });

// successful api lookup
export const success = (state, action) => {
  const { me } = action;
  return state.merge({ fetching: false, error: null, me });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, me: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SOCIAL_LOGIN]: socialLogin,
  [Types.CLEAR_SOCIAL_AUTH]: clearSocialAuth,

  [Types.GET_ME_REQUEST]: request,
  [Types.GET_ME_SUCCESS]: success,
  [Types.GET_ME_FAILURE]: failure
});
