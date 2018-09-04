import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  shipAnimation: ['payload'],
})

export const AnimationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: null,
})

/* ------------- Selectors ------------- */

export const AnimationSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// successful api lookup
export const shipAnimation = (state, action) => {
  const { payload } = action
  return state.merge({ payload })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHIP_ANIMATION]: shipAnimation,
})
