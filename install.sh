#!/bin/bash

echo "Initializing Submodules . . ."
git submodule init
git submodule update

echo "Selecting branches"
cd wiki-master
git checkout master

cd ../wiki-gh-pages
git checkout gh-pages 

cd ..
