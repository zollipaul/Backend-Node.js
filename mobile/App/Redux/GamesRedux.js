import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getGamesRequest: ["data"],
  getGamesRequestLoading: ["data"],
  getGamesSuccess: ["payload"],
  getGamesFailure: null,

  startGamesSync: null,
  stopGamesSync: null
});

export const GamesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Selectors ------------- */

export const GamesSelectors = {
  getGames: state => state.games.payload
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data });

export const requestLoading = (state, { data }) =>
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

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GAMES_REQUEST]: request,
  [Types.GET_GAMES_REQUEST_LOADING]: requestLoading,

  [Types.GET_GAMES_SUCCESS]: success,
  [Types.GET_GAMES_FAILURE]: failure
});
