'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserInterests = sequelize.define('UserInterests', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    interest1: DataTypes.STRING,
    interest2: DataTypes.STRING,
    interest3: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'userinterests',
  });
  UserInterests.associate = function(models) {
    UserInterests.belongsTo(models.User, {foreignKey: 'email'});
  };
  return UserInterests;
};