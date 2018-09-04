import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  toggleSalvo: ["data"],
  resetAllSalvoes: null,
});

export const SalvoesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable([]);

/* ------------- Selectors ------------- */

export const SalvoesSelectors = {
  getData: state => state.data
};

/* ------------- Reducers ------------- */

export const toggleSalvo = (state, action) => {
  const { data } = action;
  let mutableArray = Immutable.asMutable(state);
  let i = mutableArray.indexOf(data);
  if(i !== -1) {
    mutableArray.splice(i, 1);
  }
  else {
    mutableArray.push(data);
  }
  return Immutable(mutableArray);
};


export const resetAllSalvoes = state => {
  return Immutable([]);
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_SALVO]: toggleSalvo,
  [Types.RESET_ALL_SALVOES]: resetAllSalvoes
});
