'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserJoinsProject = sequelize.define('UserJoinsProject', {
    user_email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    pid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
  	freezeTableName: true,
    tableName: 'userjoinsproject',
  });
  UserJoinsProject.associate = function(models) {
    UserJoinsProject.belongsTo(models.User, {foreignKey: 'user_email'});
    UserJoinsProject.belongsTo(models.Project, {foreignKey: 'pid'});

  };
  return UserJoinsProject;
};