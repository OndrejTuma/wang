#!/usr/bin/env bash

cd /home/web/wang.footshop.cz
git fetch
git checkout $1
yarn install
yarn build
