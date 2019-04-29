#!/usr/bin/env bash
dropdb helper;
createdb helper;
cd $(dirname $0);
psql helper -af ./create.sql;
psql helper -c "\copy Users FROM './largedb/Users.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserCreds FROM './largedb/UserCreds.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserInterests FROM './largedb/UserInterests.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy Projects(creator_email, project_name, tag, start_date, end_date, curr_capacity, goal_capacity, city, state, description) FROM './largedb/Projects_datetime.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserJoinsProject FROM './largedb/UserJoinsProject.csv' DELIMITER ',' CSV HEADER;";