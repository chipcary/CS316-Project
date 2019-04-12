CREATE TABLE Users
(email VARCHAR(256) PRIMARY KEY,
 name VARCHAR(256) NOT NULL,
 city VARCHAR(256) NOT NULL,
 state VARCHAR(256) NOT NULL);

CREATE TABLE UserCreds
(email VARCHAR(256) NOT NULL PRIMARY KEY REFERENCES Users(email) ON DELETE CASCADE,
 hash CHAR(60) NOT NULL);

CREATE TABLE UserInterests
(email VARCHAR(256) NOT NULL PRIMARY KEY REFERENCES Users(email) ON DELETE CASCADE,
 interest1 VARCHAR(256),
 interest2 VARCHAR(256),
 interest3 VARCHAR(256));

CREATE TABLE UserTimeSlots
(email VARCHAR(256) NOT NULL REFERENCES Users(email) ON DELETE CASCADE,
 day_of_the_week VARCHAR(256) NOT NULL CHECK(day_of_the_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
 start_time INTEGER NOT NULL CHECK(start_time >= 0 AND start_time < 24 AND start_time < end_time),
 end_time INTEGER NOT NULL CHECK(end_time >= 0 AND end_time < 24));

CREATE TABLE Projects
(pid SERIAL PRIMARY KEY,
 creator_email VARCHAR(256) NOT NULL REFERENCES Users(email) ON DELETE CASCADE,
 project_name VARCHAR(256) NOT NULL,
 tag VARCHAR(256) NOT NULL,
 project_date DATE NOT NULL,
 day_of_the_week VARCHAR(256) NOT NULL CHECK(day_of_the_week IN ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday')),
 start_time INTEGER NOT NULL CHECK(start_time >= 0 AND start_time < 24 AND start_time < end_time),
 end_time INTEGER NOT NULL CHECK(end_time >= 0 AND end_time < 24),
 curr_capacity INTEGER NOT NULL CHECK(curr_capacity <= goal_capacity),
 goal_capacity INTEGER NOT NULL,
 city VARCHAR(256) NOT NULL,
 state VARCHAR(256) NOT NULL,
 description VARCHAR(256)
 );

CREATE TABLE UserJoinsProject
(user_email VARCHAR(256) NOT NULL REFERENCES Users(email) ON DELETE CASCADE,
 pid INTEGER NOT NULL REFERENCES Projects(pid) ON DELETE CASCADE,
 PRIMARY KEY(user_email, pid)
 );

CREATE FUNCTION TF_Capacity_Update() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS(SELECT * FROM Projects WHERE NEW.pid = Projects.pid AND Projects.curr_capacity = Projects.goal_capacity) THEN
        RAISE EXCEPTION 'project is at max capacity';
    END IF;

    UPDATE Projects SET curr_capacity = curr_capacity + 1
    WHERE NEW.pid = Projects.pid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER TG_Capacity_Update
  AFTER INSERT OR UPDATE ON UserJoinsProject
  FOR EACH ROW
  EXECUTE PROCEDURE TF_Capacity_Update();

CREATE FUNCTION TF_Capacity_Decrement() RETURNS TRIGGER AS $$
BEGIN
    UPDATE Projects SET curr_capacity = curr_capacity - 1
    WHERE OLD.pid = Projects.pid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER TG_Capacity_Decrement
  AFTER DELETE ON UserJoinsProject
  FOR EACH ROW
  EXECUTE PROCEDURE TF_Capacity_Decrement();
















