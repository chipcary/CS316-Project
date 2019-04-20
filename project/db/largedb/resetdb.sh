#!/usr/bin/env bash
dropdb helper;
createdb helper;
psql helper -af $(dirname "$0")/create.sql;
psql helper -af $(dirname "$0")/load.sql;
