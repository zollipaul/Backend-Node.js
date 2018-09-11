import _ from "lodash";
import Qs from "qs";
import Sequelize from "sequelize";

export default function gamesRouter(app) {
  const { models } = app.data.sequelize;

  const api = {
    pathname: "/games",
    middlewares: [
      app.server.auth.isAuthenticatedNonBlocking
      // app.server.auth.isAuthorized
    ],
    ops: {
      getAll: {
        pathname: "/",
        method: "get",
        handler: async context => {
          const result = await models.Game.getAllGames();
          context.body = {};

          console.log(context.state.user);
          if (context.state.user) {
            const user = await models.User.findByUserId(context.state.user.id);
            context.body.currentUser = user.get();
          } else {
            context.body.currentUser = null;
          }

          context.body.games = [
            {
              key: "publicGames",
              data: result
            }
          ];
          context.status = 200;
        }
      }

      // getOne: {
      //   pathname: "/:id",
      //   method: "get",
      //   handler: async context => {
      //     const user = await models.User.findByUserId(context.params.id);
      //
      //     if (!user) {
      //       context.status = 404;
      //       context.body = {
      //         error: {
      //           code: 404,
      //           name: "NotFound"
      //         }
      //       };
      //     } else {
      //       context.body = user.get();
      //       context.status = 200;
      //     }
      //   }
      // }
    }
  };

  app.server.createRouter(api);
  return {};
}
