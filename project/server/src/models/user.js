'use strict';


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'users',
  });
  User.associate = function(models) {
    User.hasOne(models.UserInterests, {foreignKey: 'email'});
    User.hasOne(models.UserCreds, {foreignKey: 'email'});
    User.hasMany(models.UserTimeSlots, {foreignKey: 'email'});
    User.hasMany(models.UserJoinsProject, {foreignKey: 'user_email'});
    User.hasMany(models.Project, {foreignKey: 'creator_email'});
  };

  //get top projects by tag in your time that fit in your schedule
  //callback is used to keep it async
  User.getRecProjects =  function(email, res){
        sequelize.query(`WITH available_projects AS(
  SELECT p1.pid
  FROM Users, UserInterests, UserTimeSlots, Projects as p1
  WHERE Users.email = :email
  AND Users.city = p1.city
  AND Users.state = p1.state
  AND UserTimeSlots.email = Users.email
  AND UserTimeSlots.day_of_the_week = p1.day_of_the_week
  AND UserTimeSlots.start_time <= p1.start_time
  AND UserTimeSlots.end_time >= p1.end_time
  AND p1.curr_capacity < p1.goal_capacity
  EXCEPT(
    SELECT pid FROM UserJoinsProject
    WHERE user_email = :email
  )
)
SELECT Projects.project_name, Projects.creator_email,
  Projects.tag, Projects.project_date, Projects.day_of_the_week,
  Projects.start_time, Projects.end_time, Projects.curr_capacity, Projects.goal_capacity, Projects.city, Projects.state
FROM UserInterests, available_projects, Projects
WHERE Projects.pid = available_projects.pid
AND UserInterests.email = :email
order by interest1 = tag desc, interest2 = tag desc, interest3 = tag desc;`,
{replacements: {email: email}})
        .then(([results, metadata]) =>{
          res.send(results);
        })
        .catch(error => {res.send(error)});
      }
  return User;
};