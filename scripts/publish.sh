#! /bin/sh

name=$(npm -s run env echo '$npm_package_name')
version=$(npm -s run env echo '$npm_package_version')

node $PWD/scripts/check-version-published.js $name $version

if [ $? -eq 0 ] ; then
  npm publish --access=public
else
  echo "No changes to publish"
fi
