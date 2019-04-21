#!/usr/bin/env bash
sh ../db/reset_smalldb.sh;
mocha --exit;