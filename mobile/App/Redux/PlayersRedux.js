import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */
// creators are for dispatching an Action. e.g. this: console.log(Creators.getPlayersRequest('test')) --> results in {type: 'PLAYERS_REQUEST', data: 'test'}
// types are for just getting the types in SCREAMING_SNAKE_CASE: -->  // console.log(Types)

const { Types, Creators } = createActions({
  getPlayersRequest: ["data"],
  getPlayersSuccess: ["payload"],
  getPlayersFailure: null,

  loginPlayerRequest: ["data"],
  loginPlayerSuccess: ["payload"],
  loginPlayerFailure: null,

  loginFacebookRequest: ["data"],
  loginFacebookSuccess: ["payload"],
  loginFacebookFailure: null,

  loginGoogleRequest: ["data"],
  loginGoogleSuccess: ["payload"],
  loginGoogleFailure: null,

  logoutPlayerRequest: ["data"],
  logoutPlayerSuccess: ["payload"],
  logoutPlayerFailure: null,

  setUserNameRequest: ["data"],
  setUserNameSuccess: ["payload"],
  setUserNameFailure: null,

  signUpPlayerRequest: ["data"],
  signUpPlayerSuccess: ["payload"],
  signUpPlayerFailure: null,

  deletePlayerRequest: ["data"],
  deletePlayerSuccess: ["payload"],
  deletePlayerFailure: null,

  manageLogin: null
});

export const PlayersTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Selectors ------------- */

export const PlayersSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

/* ------------- Hookup Reducers To Types ------------- */

// merges initial state and handlers. handlers is mapping of types and reducers
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PLAYERS_REQUEST]: request,
  [Types.GET_PLAYERS_SUCCESS]: success,
  [Types.GET_PLAYERS_FAILURE]: failure,

  [Types.LOGIN_PLAYER_REQUEST]: request,
  [Types.LOGIN_PLAYER_SUCCESS]: success,
  [Types.LOGIN_PLAYER_FAILURE]: failure,

  [Types.LOGIN_FACEBOOK_REQUEST]: request,
  [Types.LOGIN_FACEBOOK_SUCCESS]: success,
  [Types.LOGIN_FACEBOOK_FAILURE]: failure,

  [Types.LOGIN_GOOGLE_REQUEST]: request,
  [Types.LOGIN_GOOGLE_SUCCESS]: success,
  [Types.LOGIN_GOOGLE_FAILURE]: failure,

  [Types.SET_USER_NAME_REQUEST]: request,
  [Types.SET_USER_NAME_SUCCESS]: success,
  [Types.SET_USER_NAME_FAILURE]: failure,

  [Types.SIGN_UP_PLAYER_REQUEST]: request,
  [Types.SIGN_UP_PLAYER_SUCCESS]: success,
  [Types.SIGN_UP_PLAYER_FAILURE]: failure,

  [Types.DELETE_PLAYER_REQUEST]: request,
  [Types.DELETE_PLAYER_SUCCESS]: success,
  [Types.DELETE_PLAYER_FAILURE]: failure
});
