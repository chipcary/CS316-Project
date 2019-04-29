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


CREATE TABLE Projects
(pid SERIAL PRIMARY KEY,
 creator_email VARCHAR(256) NOT NULL REFERENCES Users(email) ON DELETE CASCADE,
 project_name VARCHAR(256) NOT NULL,
 tag VARCHAR(256) NOT NULL,
 start_date TIMESTAMP NOT NULL,
 end_date TIMESTAMP NOT NULL CHECK(start_date < end_date), 
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

CREATE INDEX ON Projects(tag);

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


CREATE FUNCTION TF_Creator_Joins_Project() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO UserJoinsProject VALUES (NEW.creator_email, NEW.pid);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER TG_Creator_Joins_Project
  AFTER INSERT ON Projects
  FOR EACH ROW
  EXECUTE PROCEDURE TF_Creator_Joins_Project();













