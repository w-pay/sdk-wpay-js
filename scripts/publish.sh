#! /bin/sh

version=$(npm -s run env echo '$npm_package_version')

node $PWD/scripts/check-version-published.js $version

if [ $? -eq 0 ] ; then
  npm publish --access=public
else
  echo "No changes to publish"
fi
