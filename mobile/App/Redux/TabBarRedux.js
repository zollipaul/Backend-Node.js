import { createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clickOnGameInTabBar: null,
  clickOnGamesInTabBar: null
});

export const TabBarTypes = Types;
export default Creators;
