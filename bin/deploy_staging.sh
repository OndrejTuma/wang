#!/usr/bin/env bash

cd /home/web/wang.dev.footshop.cz
git fetch
git checkout $1
yarn install
yarn build
