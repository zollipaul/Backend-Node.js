"use strict";
let _ = require("lodash");
let assert = require("assert");
let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");

export default function Data(config) {
  let log = require("logfilename")(__filename);
  let dbConfig = config.db;
  let sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    dbConfig
  );
  let modelsMap = {};

  let data = {
    sequelize,
    Sequelize,
    registerModelsFromDir(baseDir, name) {
      log.debug(`registerModelFromDir: ${baseDir} in ${name}`);
      let dirname = path.join(baseDir, name);
      fs
        .readdirSync(dirname)
        .filter(file => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
        .forEach(file => {
          log.debug("model file: ", file);
          data.registerModel(dirname, file);
        });
    },

    registerModel(dirname, modelFile) {
      log.debug("registerModel ", modelFile);
      let model = sequelize["import"](path.join(dirname, modelFile));
      modelsMap[model.name] = model;
    },

    associate() {
      log.debug("associate");
      Object.keys(modelsMap).forEach(modelName => {
        if (modelsMap[modelName].associate) {
          modelsMap[modelName].associate(modelsMap);
        }
      });
    },
    models() {
      return sequelize.models;
    },
    async start(app) {
      log.info("db start");

      // set force to false to prevent overriding database
      let option = {
        force: true
      };
      await sequelize.sync(option);
      await this.seedIfEmpty(app);
      log.info("db started");
    },

    async stop() {
      log.info("db stop");
    },

    async seed(app) {
      log.info("seed");
      let option = {
        force: true
      };
      await sequelize.sync(option);
      await this.seedDefault(app);
      log.info("seeded");
    },
    async seedDefault(app) {
      log.debug("seedDefault");
      const plugins = app.plugins.get();
      for (let name in plugins) {
        log.debug("seedDefault plugin ", name);
        const { seedDefault } = plugins[name];
        console.log("plugin: " + plugins[name]);
        if (_.isFunction(seedDefault)) {
          await seedDefault();
        }
      }
    },
    async seedIfEmpty(app) {
      log.info("seedIfEmpty");
      let userCount = await sequelize.models.User.count();
      let gamesCount = await sequelize.models.Game.count();

      if (userCount > 0 && gamesCount > 0) {
        log.info("seedIfEmpty #users: ", userCount);
        log.info("seedIfEmpty #games: ", gamesCount);
      } else {
        return this.seedDefault(app);
      }
    }
  };
  return data;
}
