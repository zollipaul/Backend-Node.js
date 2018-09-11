module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define(
    "PasswordReset",
    {
      token: DataTypes.STRING(32)
    },
    {
      tableName: "password_resets",
      underscored: true,
      timestamps: true
    }
  );

  PasswordReset.associate = models => {
    models.User.hasOne(PasswordReset, { foreignKey: "user_id" });
  };

  return PasswordReset;
};
