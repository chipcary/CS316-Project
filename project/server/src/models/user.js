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
    User.hasMany(models.UserJoinsProject, {foreignKey: 'user_email'});
    User.hasMany(models.Project, {foreignKey: 'creator_email'});
  };

  //get top projects by tag in your time that fit in your schedule
  //callback is used to keep it async
  User.getRecProjects =  function(email, res){
        sequelize.query(`WITH available_projects AS(
  SELECT p1.pid
  FROM Users, UserInterests, Projects as p1
  WHERE Users.email = :email
  AND Users.city = p1.city
  AND Users.state = p1.state
  AND p1.start_date > NOW()
  AND p1.curr_capacity < p1.goal_capacity
  EXCEPT(
    SELECT pid FROM UserJoinsProject
    WHERE user_email = :email
  )
)
SELECT Projects.pid, Projects.project_name, Projects.creator_email,
  Projects.tag, Projects.start_date, Projects.end_date, Projects.curr_capacity, 
  Projects.goal_capacity, Projects.city, Projects.state
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
      
User.getRecProjectsForSubstring =  function(email, substring, res){
      sequelize.query(`WITH available_projects AS(
SELECT p1.pid
FROM Users, UserInterests, Projects as p1
WHERE Users.email = :email
AND Users.city = p1.city
AND Users.state = p1.state
AND p1.start_date > NOW()
AND p1.curr_capacity < p1.goal_capacity
EXCEPT(
  SELECT pid FROM UserJoinsProject
  WHERE user_email = :email
)
)
SELECT Projects.pid, Projects.project_name, Projects.creator_email,
Projects.tag, Projects.start_date, Projects.end_date, Projects.curr_capacity, 
Projects.goal_capacity, Projects.city, Projects.state
FROM UserInterests, available_projects, Projects
WHERE Projects.pid = available_projects.pid
AND UserInterests.email = :email
AND Projects.project_name ILIKE :substring
order by interest1 = tag desc, interest2 = tag desc, interest3 = tag desc;`,
{replacements: {email: email, substring: substring}})
      .then(([results, metadata]) =>{
        res.send(results);
      })
      .catch(error => {res.send(error)});
    }
  return User;
};