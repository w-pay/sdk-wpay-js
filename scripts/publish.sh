#! /bin/sh

version=$(npm -s run env echo '$npm_package_version')

node $PWD/scripts/check-version-published.js $version

echo $NODE_AUTH_TOKEN

if [ $? -eq 0 ] ; then
  echo "Pretend publish"
  #npm publish --access=public
else
  echo "No changes to publish"
fi
