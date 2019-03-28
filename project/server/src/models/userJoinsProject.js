'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserJoinsProject = sequelize.define('UserJoinsProject', {
    user_email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    creator_email: DataTypes.STRING,
    project_name: DataTypes.STRING
  }, {
  	freezeTableName: true,
    tableName: 'userjoinsproject',
  });
  UserJoinsProject.associate = function(models) {
    UserJoinsProject.belongsTo(models.User, {foreignKey: 'user_email'});

  };
  return UserJoinsProject;
};