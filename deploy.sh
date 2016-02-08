#!/bin/bash

# Automate Deployment -- bash script
# - run clearPages.sh
# - run
# - git checkout master
# - Pull down the Wiki
# - Run Conversion  (See above)
# - Run Cleanup (See above)
# - Run Gatsby Build Operation
# - git checkout gh-pages
# - Copy files to `gh-pages`
# - Commit files to that branch
# - Git push

# Refresh pages directory
./clearPages.sh

# Update wiki repo copy
cd wiki-master
git pull origin master
cd ..

# Copy and Transform .md files from wiki repo
node create_structure.js
node convert_files.js

# Build Output
gatsby build --prefix-links

# TODO:  Clear out existing folders before copy

# Copy generated output to gh-pages on live wiki
cp -r wiki-master/images/* wiki-gh-pages/images/
# TODO:  Copy language images folders
cp -r public/* wiki-gh-pages/
cp css/* wiki-gh-pages/css/

# Update gh-pages branch with new files
cd wiki-gh-pages/
git pull origin gh-pages
git add -A
git commit -m "Page built on `date +"%d-%m-%Y %T"`"

# Push gh-pages live
git push origin gh-pages

# Push regular wiki live
cd ../wiki-master
#git push live master
cd ..
