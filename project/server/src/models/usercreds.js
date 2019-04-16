'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserCreds = sequelize.define('UserCreds', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    hash: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'usercreds',
  });
  UserCreds.associate = function(models) {
    UserCreds.belongsTo(models.User, {foreignKey: 'email'});
  };
  return UserCreds;
};