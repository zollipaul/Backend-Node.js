module.exports = (sequelize, DataTypes) => {
  const log = require("logfilename")(__filename);
  const models = sequelize.models;

  const Game = sequelize.define(
    "Game",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      winner: {
        type: DataTypes.STRING(64)
      },
      stage: {
        type: DataTypes.STRING(64),
        defaultValue: "placingShips"
      },
      turn: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      whoShotThisTurn: {
        type: DataTypes.ARRAY(DataTypes.UUID)
      }
    },
    {
      tableName: "games",
      underscored: false
    }
  );

  Game.seedDefault = async () => {
    let gamesJson = require("./fixtures/games.json");
    //log.debug("seedDefault: ", JSON.stringify(usersJson, null, 4));
    for (let gameJson of gamesJson) {
      await Game.createGame(gameJson);
    }
  };

  Game.createGame = async gameJson => {
    // log.debug("createUserInGroups user:%s, group: ", userJson, groups);
    return sequelize
      .transaction(async t => {
        let gameCreated = await models.Game.create(gameJson, {
          transaction: t
        });
        return gameCreated;
      })
      .catch(err => {
        log.error("createGame: rolling back", err);
        throw err;
      });
  };

  Game.getAllGames = async function() {
    return this.findAll({
      attributes: ["id", "createdAt", "stage", "turn", "winner", "whoShotThisTurn"],
      include: [
        {
          model: models.GamePlayer,
          as: "gamePlayers",
          attributes: ["id", "createdAt"],
          include: [
            {
              model: models.User,
              as: "user",
              attributes: ["id", "createdAt", "username", "email"]
            }
          ]
        }
      ]
    });
  };

  Game.associate = models => {
    Game.hasMany(models.GamePlayer, {
      foreignKey: "gameId",
      as: "gamePlayers"
    });
  };

  return Game;
};
