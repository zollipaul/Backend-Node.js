import Promise from "bluebird";
import Log from "logfilename";
// import nodemailer from "nodemailer";
// import PassportAuth from './PassportAuth';

import config from "config";

// Jobs
// import MailJob from './jobs/mail/MailJob';
//
// import MeRouter from './me/MeRouter';
//
import gamesRouter from "./gamesRouter";
//
// import AuthenticationRouter from './authentication/AuthenticationRouter';

let log = new Log(__filename);

export default function GamesListPlugin(app) {
  app.data.registerModelsFromDir(__dirname, "./models");

  // setupAuthentication(app);

  setupRouter(app);

  let models = app.data.models();
  return {
    async start() {
      // try {
      //   for (let part of parts) {
      //     await part.start(app);
      //   };
      // } catch(error){
      //   log.error(`cannot start: ${error}`);
      // }
    },

    async stop() {
      // await Promise.each(parts, obj => obj.stop(app));
    },
    seedDefault() {
      let seedDefaultFns = [models.Game.seedDefault, models.GamePlayer.seedDefault];

      return Promise.each(seedDefaultFns, fn => fn());
    },
    async isSeeded() {
      let count = await models.Game.count();
      log.debug("#games ", count);
      return count;
    }
  };
}

function setupRouter(app) {
  //Games
  gamesRouter(app);
  //
  // //Me
  // MeRouter(app);
  //
  // //Users
  // UserRouter(app);
}

// function setupAuthentication(app) {
//   let auth = new PassportAuth(app);
//   app.auth = auth;
//   return auth;
// }
