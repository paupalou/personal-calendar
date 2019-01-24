#!/bin/bash

rm -rf build/
yarn build
cd build
BUILD_GZ_FILE=build-$(date +%Y%m%d"-"%H%M%S).tar.gz
tar -cvzf $BUILD_GZ_FILE  *
mv $BUILD_GZ_FILE ../
scp -r . cheto:/home/pau/nginx/www
cd ..
rm -rf build/
