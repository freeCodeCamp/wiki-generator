#!/bin/bash

echo "Initializing Submodules . . ."
git submodule init
git submodule update
echo "modules ready"

echo "Selecting branches"
cd wiki-master
git checkout master
echo "master checked out"

cd ../wiki-gh-pages
git checkout gh-pages 
echo "gh-pages checked out"

cd ..
