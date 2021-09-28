#! /bin/sh

version=$(npm -s run env echo '$npm_package_version')
version="v${version}"

if git show-ref --tags $version --quiet; then
  echo "Tag exists"
else
  git tag $version
fi
