'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    creator_email: {
    	type: DataTypes.STRING,
    	primaryKey: true
    },
    project_name: {
    	type: DataTypes.STRING,
    	primaryKey:true
    },
    tag: DataTypes.STRING,
    project_date: DataTypes.DATE,
    day_of_the_week: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER,
    curr_capacity: DataTypes.INTEGER,
    goal_capacity: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
  	freezeTableName: true,
    tableName: 'projects',
  });
  Project.associate = function(models) {
    Project.belongsTo(models.User, {foreignKey: 'creator_email'});
  };

  return Project;
};