# Scripts for deploying the wiki to gh-pages

## Instructions

1. Install all pacages with `npm install`
2. Initialize and update the submodules `npm run init-pages`
3. Clean and create the structure for the pages with `npm run create-struc`
4. Then copy the assets with `npm run copy-assets`
5. Run a local instance with `npm run start`. This will serve it on `http://0.0.0.0:8000/`
6. Copy the templates with `npm run copy-templates`
6. When satisfied with your changes, do `npm run save-pages` to update the gatsby wiki. This will commit changes with the date as the commit message `"Page built on date +"%d-%m-%Y %T"`
