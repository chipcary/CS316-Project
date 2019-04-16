'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    pid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    creator_email: DataTypes.STRING,
    project_name: DataTypes.STRING,
    tag: DataTypes.STRING,
    project_date: DataTypes.DATE,
    day_of_the_week: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    curr_capacity: DataTypes.INTEGER,
    goal_capacity: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
  	freezeTableName: true,
    tableName: 'projects',
  });
  Project.associate = function(models) {
    Project.belongsTo(models.User, {foreignKey: 'creator_email'});
    Project.hasMany(models.UserJoinsProject, {foreignKey: 'pid'});
  };

  return Project;
};