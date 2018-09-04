
import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createGameRequest: ["data"],
  createGameSuccess: ["payload"],
  createGameFailure: null,

  changeGame: ["payload"],

  clickOnGameInTabBar: null,
  clickOnGamesInTabBar: null,

  joinGameRequest: ["data"],
  joinGameSuccess: ["payload"],
  joinGameFailure: null,

  startGameRequest: ["data"],
  startGameSuccess: ["payload"],
  startGameFailure: null,

  postSalvoesRequest: ["data"],
  postSalvoesSuccess: ["payload"],
  postSalvoesFailure: null
});

export const ManageGameTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
});

/* ------------- Selectors ------------- */

export const ManageGameReduxSelectors = {
  getShips: state => {
    return state.ships.data
  },
  getSalvoes: state => {
    return state.salvoes
  }
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

export const changeGame = (state, action) => {
  const { payload } = action;
  return state.merge({ payload });
};

// todo: evtl löschen
export const clickOnGameInTabBar = state => {
  return state;
};



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_GAME_REQUEST]: request,
  [Types.CREATE_GAME_SUCCESS]: success,
  [Types.CREATE_GAME_FAILURE]: failure,

  [Types.CHANGE_GAME]: changeGame,

  [Types.JOIN_GAME_REQUEST]: request,
  [Types.JOIN_GAME_SUCCESS]: success,
  [Types.JOIN_GAME_FAILURE]: failure,

  [Types.START_GAME_REQUEST]: request,
  [Types.START_GAME_SUCCESS]: success,
  [Types.START_GAME_FAILURE]: failure,

  [Types.POST_SALVOES_REQUEST]: request,
  [Types.POST_SALVOES_SUCCESS]: success,
  [Types.POST_SALVOES_FAILURE]: failure,

  [Types.CLICK_ON_GAME_IN_TAB_BAR]: clickOnGameInTabBar
});
