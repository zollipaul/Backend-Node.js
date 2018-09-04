import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import Ships from "../Data/Ships";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pushShip: ["data"],

  resetShip: ["id"],

  resetAllShips: null
});

export const ShipsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  payload: null,
  counter: 0
});

/* ------------- Selectors ------------- */

export const ShipsSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

export const pushShip = (state, action) => {
  const { data } = action;
  const id = data.id;
  return (
    state
      .setIn(["data", [id]], data.ship)
      // for counting the ships, set in store
      .merge({
        counter:
          state.data[id].location.length === 0 &&
          data.ship.location.length !== 0
            ? state.counter + 1
            : state.counter
      })
  );
};

export const resetShip = (state, action) => {
  const { id } = action;
  return (
    state
      .setIn(["data", [id]], Ships[id])
      // for counting the ships, set in store
      .merge({
        counter:
          state.data[id].location.length !== 0
            ? state.counter - 1
            : state.counter
      })
  );
};

export const resetAllShips = state => {
  return state.merge({
    data: Ships,
    counter: 0
  });
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PUSH_SHIP]: pushShip,

  [Types.RESET_SHIP]: resetShip,

  [Types.RESET_ALL_SHIPS]: resetAllShips
});
