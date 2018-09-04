import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postGameGridX: ["payload"],
  postGameGridY: ["payload"]
});

export const GameGridTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
});

/* ------------- Selectors ------------- */

export const GameGridSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

export const postGameGridX = (state, action) => {
  const { payload } = action;
  return state.setIn(["payload", "px"], payload)
};

export const postGameGridY = (state, action) => {
  const { payload } = action;
  return state.setIn(["payload", "py"], payload)
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_GAME_GRID_X]: postGameGridX,
  [Types.POST_GAME_GRID_Y]: postGameGridY
});
