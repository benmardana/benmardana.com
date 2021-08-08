#!/bin/sh

echo "Saving current repo...\n"
git add .
git commit -m ${1:-building}
git push --force

echo "Building...\n"

# remove any old builds
rm -rf __sapper__/export

# run the site builder
npm run export

# set up CNAME
echo benmcgarvey.com >> __sapper__/export/CNAME
echo www.benmcgarvey.com >> __sapper__/export/CNAME

# set up README
echo benmcgarvey.com >> __sapper__/export/README.md

echo "Removing old site...\n"
# scrub the submodule
rm -rfv benmcgarvey.github.io/*

echo "Copying new site...\n"
# copy the new site into the submodule
cp -r __sapper__/export/. benmcgarvey.github.io

echo "Updating git submodule...\n"
# update git submodule
cd benmcgarvey.github.io
git add .
git commit -m ${1:-building}
git push --force

echo "Updating parent git...\n"
cd -
git add .
git commit -m ${1:-building}
git push --force
