#!/usr/bin/env bash
dropdb helper;
createdb helper;
cd $(dirname $0);
psql helper -af ./create.sql;
psql helper -c "\copy Users FROM './largedb/Users.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserCreds FROM './largedb/UserCreds.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserInterests FROM './largedb/UserInterests.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserTimeSlots FROM './largedb/UserTimeSlots.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy Projects FROM './largedb/Projects.csv' DELIMITER ',' CSV HEADER;";
psql helper -c "\copy UserJoinsProject FROM './largedb/UserJoinsProject.csv' DELIMITER ',' CSV HEADER;";