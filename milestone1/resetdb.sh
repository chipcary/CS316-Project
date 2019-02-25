#!/usr/bin/env bash
dropdb helper;
createdb helper;
psql helper -af create.sql;
psql helper -af load.sql;