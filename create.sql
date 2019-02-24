CREATE TABLE Users
(email VARCHAR(256) PRIMARY KEY,
 name VARCHAR(256) NOT NULL,
 city VARCHAR(256) NOT NULL,
 state VARCHAR(256) NOT NULL);

CREATE TABLE UserInterests
(email VARCHAR(256) NOT NULL PRIMARY KEY REFERENCES Users(email),
 interest1 VARCHAR(256),
 interest2 VARCHAR(256),
 interest3 VARCHAR(256));

CREATE TABLE UserTimeSlots
(email VARCHAR(256) NOT NULL PRIMARY KEY REFERENCES Users(email),
 day_of_the_week VARCHAR(256) NOT NULL CHECK(day_of_the_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
 start_time INTEGER NOT NULL CHECK(start_time >= 0 AND start_time < 24 AND start_time < end_time),
 end_time INTEGER NOT NULL CHECK(end_time >= 0 AND end_time < 24));

CREATE TABLE Projects
(creator_email VARCHAR(256) NOT NULL,
 project_name VARCHAR(256) NOT NULL,
 tag VARCHAR(256) NOT NULL,
 project_date DATE NOT NULL,
 day_of_the_week VARCHAR(256) NOT NULL CHECK(day_of_the_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
 start_time INTEGER NOT NULL CHECK(start_time >= 0 AND start_time < 24 AND start_time < end_time),
 end_time INTEGER NOT NULL CHECK(end_time >= 0 AND end_time < 24),
 curr_capacity INTEGER NOT NULL CHECK(curr_capacity <= goal_capacity),
 goal_capacity INTEGER NOT NULL,
 PRIMARY KEY(creator_email, project_name));

CREATE TABLE UserJoinsProject
(user_email VARCHAR(256) NOT NULL REFERENCES Users(email),
 creator_email VARCHAR(256) NOT NULL,
 project_name VARCHAR(256) NOT NULL,
 FOREIGN KEY (creator_email, project_name) REFERENCES Projects(creator_email, project_name)
 );