# Scripts for deploying the wiki to gh-pages

## Instructions

1. Install all pacages with `npm install`
2. Run a local instance with `npm run build`. This will serve it on `http://0.0.0.0:8000/`
3. When satisfied with your changes, do `npm run save-changes` to update the gatsby wiki. This will save the templates and commit changes with the date as the commit message `"Page built on date +"%d-%m-%Y %T"`
