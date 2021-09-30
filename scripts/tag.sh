#! /bin/sh

version=$(npm -s run env echo '$npm_package_version')
version="v${version}"

# When GH Actions checks out the repo it doesn't pull tags
echo "Fetching tags"
git fetch --tags

if git show-ref --tags $version --quiet; then
  echo "Tag exists"
else
  echo "Tagging with ${version}"
  git tag $version

  # Need to push to GH to then create a release
  git push --tags

  echo $GH_AUTH_TOKEN | gh auth login --with-token
  gh release create $version
fi
