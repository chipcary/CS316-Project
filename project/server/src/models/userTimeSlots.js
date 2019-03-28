'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserTimeSlots = sequelize.define('UserTimeSlots', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    day_of_the_week: DataTypes.STRING,
    start_time: DataTypes.INTEGER,
    end_time: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'usertimeslots',
  });
  UserTimeSlots.associate = function(models) {
    UserTimeSlots.belongsTo(models.User, {foreignKey: 'email'});
  };
  return UserTimeSlots;
};