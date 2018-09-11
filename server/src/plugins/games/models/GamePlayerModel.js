module.exports = (sequelize, DataTypes) => {
  const log = require("logfilename")(__filename);
  const models = sequelize.models;

  const GamePlayer = sequelize.define(
    "GamePlayer",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      hits: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      gameId: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: "games",
          key: "id",
          as: "gameId"
        }
      },
      userId: {
        type: DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId"
        }
      }
    },
    {
      tableName: "gamePlayers",
      underscored: false
    }
  );

  GamePlayer.seedDefault = async () => {
    // let gamePlayersJson = require("./fixtures/gamePlayers.json");
    // //log.debug("seedDefault: ", JSON.stringify(usersJson, null, 4));
    // for (let gamePlayerJson of gamePlayersJson) {
    //   await GamePlayer.createGamePlayer(gamePlayerJson);
    // }

    let paul = await models.User.findByUsername("Paul");
    let pete = await models.User.findByUsername("Pete");
    let games = await models.Game.all();
    await GamePlayer.createGamePlayer(paul, games[0]);
    await GamePlayer.createGamePlayer(pete, games[0]);
    await GamePlayer.createGamePlayer(paul, games[1]);
  };
  GamePlayer.createGamePlayer = async (user, game) => {
    log.debug("createGamePlayer user:%s, game: ", user, game);
    return sequelize
      .transaction(async t => {
        let gamePlayerCreated = await models.GamePlayer.create(
          {},
          {
            transaction: t
          }
        );
        game.addGamePlayer(gamePlayerCreated);
        user.addGamePlayer(gamePlayerCreated);
        return gamePlayerCreated;
      })
      .catch(err => {
        log.error("createGamePlayer: rolling back", err);
        throw err;
      });
  };

  GamePlayer.associate = models => {
    GamePlayer.belongsTo(models.Game, {
      foreignKey: "gameId",
      onDelete: "CASCADE",
      as: "game"
    });
    GamePlayer.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      as: "user"
    });
  };

  return GamePlayer;
};
