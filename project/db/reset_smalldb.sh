#!/usr/bin/env bash
dropdb helper;
createdb helper;
cd $(dirname $0);
psql helper -af ./create.sql;
psql helper -af ./smalldb/load.sql;