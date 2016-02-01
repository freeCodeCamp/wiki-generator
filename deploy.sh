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

# Copy generated output to gh-pages on live wiki
cp -r public/docs/* wiki-gh-pages/docs/
cp public/bundle.js wiki-gh-pages/
cp public/index.html wiki-gh-pages/
cp public/bundle.js.map wiki-gh-pages/

# Update gh-pages branch with new files
cd wiki-gh-pages/
git pull origin gh-pages
git add docs
git add bundle.js.map
git add bundle.js
git add index.html
git commit -m "Page built on `date +"%d-%m-%Y %T"`"

# Push gh-pages live
git push origin gh-pages

# Push regular wiki live
cd ../wiki-master
#git push live master
cd ..
