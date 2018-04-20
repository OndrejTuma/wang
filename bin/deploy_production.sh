#!/usr/bin/env bash

cd /home/web/wang.footshop.cz
git fetch
git checkout $1
/home/web/npm/bin/yarn install
/home/web/npm/bin/yarn build
