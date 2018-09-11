export default function MeRouter(app /*auth*/) {
  const { models } = app.data.sequelize;
  const { validateSchema } = app.utils.api;

  const api = {
    pathname: "/me",
    middlewares: [app.server.auth.isAuthenticated],
    ops: {
      get: {
        pathname: "/",
        method: "get",
        handler: async context => {
          const user = await models.User.findByUserId(context.state.user.id);
          context.body = user.get();
          context.status = 200;
        }
      },
      patch: {
        pathname: "/",
        method: "patch",
        schema: require("./schema/patch.json"),
        handler: async context => {
          const userId = context.state.user.id;
          const data = context.request.body;
          if (!validateSchema(data, require("./schema/patch.json"), context))
            return;
          //TODO refactor with nested data
          //TODO transaction ?

          let userByUsername = await models.User.findByUsername(data.username);
          let userPendingByUsername = await models.UserPending.find({
            where: {
              username: data.username
            }
          });
          if (userByUsername || userPendingByUsername) {
            context.status = 422;
            context.name = "UsernameExists";
            context.message = "The username is already used.";
            return;
          }

          await models.User.update(data, {
            where: {
              id: userId
            }
          });
          //TODO upsert ?
          const profileData = {
            biography: data.biography || ""
          };

          await models.Profile.update(profileData, {
            where: {
              user_id: userId
            }
          });
          const updatedUser = await models.User.findByUserId(
            context.state.user.id
          );
          context.body = updatedUser.get();
          context.status = 200;
        }
      },
      delete: {
        pathname: "/",
        method: "delete",
        handler: async context => {
          const userId = context.state.user.id;

          await models.User.destroy({
            where: {
              id: userId
            }
          });
          context.message = "userDeleted";
          context.status = 200;
          context.logout();
        }
      }
    }
  };

  app.server.createRouter(api);
}
