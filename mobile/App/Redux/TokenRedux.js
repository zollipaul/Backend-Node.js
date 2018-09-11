import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setToken: ["payload"],
    clearToken: null,
    setTokenFromStore: null,
});

export const TokenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    payload: null
});

/* ------------- Selectors ------------- */

export const TokenSelectors = {
    getToken: state => state.token.payload
};

/* ------------- Reducers ------------- */

export const setToken = (state, action) => {
    const { payload } = action;
    return state.merge({ payload });
};

export const clearToken = state => {
    return state.merge({ payload: null });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_TOKEN]: setToken,
    [Types.CLEAR_TOKEN]: clearToken
});
