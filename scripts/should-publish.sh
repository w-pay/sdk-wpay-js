#! /bin/sh

version=$(npm -s run env echo '$npm_package_version')

node $PWD/scripts/check-version-published.js $version
