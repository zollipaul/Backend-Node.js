// a library to wrap and simplify api calls
import apisauce from "apisauce";
import qs from "qs";
import AppConfig from "../Config/AppConfig";

// our "constructor"
const create = (baseURL = AppConfig.server) => {
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      Accept: "application/json, application/xml, text/plain, text/html"
      // "Content-type": "application/json",
      // 'X-Requested-With': 'XMLHttpRequest',
    },
    //   xhrFields: {
    //   // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    //   // This can be used to set the 'withCredentials' property.
    //   // Set the value to 'true' if you'd like to pass cookies to the server.
    //   // If this is enabled, your server must respond with the header
    //   // 'Access-Control-Allow-Credentials: true'.
    //   withCredentials:
    // },
    //   mode: 'cors',
    withCredentials: true,
    // dataType: 'json',
    // 10 second timeout...
    timeout: 10000
  });
  // const naviMonitor = (response) => console.log('hey!  listen! ', response)
  // api.addMonitor(naviMonitor)

  // let data =  { userName: "peter@paul.de", password: "123456" }

  // console.log(jsonToURI(data))
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  const getPlayers = () => api.get("players");
  const loginPlayer = data => {
    console.log(data);
    return api.post("login", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
  };

  const loginFacebook = () => api.get("login/facebook");
  const loginGoogle = () => api.get("login/google");

  const logoutPlayer = () => api.get("logout");

  const signUpPlayer = data =>
    api.post("signUp", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });

  const setUserName = data => {
    console.log(data);
    console.log(qs.stringify(data));
    return api.post("setUserName", qs.stringify(data), {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    });
  };

  const deletePlayer = () => api.get("deletePlayer");

  const getGames = () => api.get("games");
  const getGameView = gamePlayerId => api.get("game_view/" + gamePlayerId);
  const getLeaderboard = () => api.get("leaderboard");
  const createGame = () => api.post("games/");
  const joinGame = gameId => api.post("game/" + gameId + "/joinGame");
  const postShips = (gamePlayerId, ships) =>
    api.post("/games/players/" + gamePlayerId + "/ships", ships, {
      headers: { "content-type": "application/json" }
    });
  const postSalvoes = (gamePlayerId, salvoes) =>
    api.post("/games/players/" + gamePlayerId + "/salvoes", salvoes, {
      headers: { "content-type": "application/json" }
    });

  const postGeolocation = (mode, coords) =>
    api.post("/geolocation/" + mode, coords, {
      headers: { "content-type": "application/json" }
    });

  const setToken = token => {
    api.setHeader("Authorization", "Bearer " + token);
  };

  const clearToken = () => {
    delete api.headers["Authorization"];
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //

  return {
    getPlayers,
    loginPlayer,
    loginFacebook,
    loginGoogle,
    logoutPlayer,
    signUpPlayer,
    deletePlayer,
    setUserName,
    getGames,
    getGameView,
    getLeaderboard,
    createGame,
    joinGame,
    postShips,
    postSalvoes,
    postGeolocation,
    setToken,
    clearToken
  };
};

// let's return back our create method as the default.
export default {
  create
};
