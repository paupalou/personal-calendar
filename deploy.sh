#!/bin/bash

rm -rf www/
yarn build
cd build
BUILD_GZ_FILE=build-$(date +%Y%m%d"-"%H%M%S).tar.gz
tar -cvzf $BUILD_GZ_FILE  *
mv $BUILD_GZ_FILE ../releases/
cd ..
rsync -a --delete build/ cheto:/home/pau/nginx/www/
rm -rf build/
