# Project Status

The project has ended as we have moved our wiki to the forum, there are some outstanding issues, if you would like to fix them and continue to use the codebase, feel free to do so and submit your pull request with the changes.

## Scripts for deploying the wiki to `gh-pages`

## Requirements

- Currently the generator has only been tested to **work** on a 64 bit machine running **Ubuntu 16.04**.
- A machine running **OSX** should also **work** as will any other linux machine.
- **Windows** is currently **not supported**. If you want to bring support for Windows, you are welcome to submit a pull request.
- You will have to set **SSL** for your github account.
- You need to have **write access** to the [**Wiki**](https://github.com/FreeCodeCamp/wiki) repository, otherwise you will not be able to deploy, only build.

## Instructions

These are the manual instructions. If you are having errors along the way, these series of commands will make it easier to debug.

1. Install all packages with `npm install`
2. Initialize and update submodules with `npm run init-pages`
3. Clean and create the structure for the pages with `npm run create-struc`
4. Build with `npm run build`
5. Copy the assets with `npm run copy-assets`
6. Copy the templates with `npm run copy-templates`
7. Run a local instance with `npm run start`. This will serve the wiki on `http://0.0.0.0:8000/`  **Note** that you would actually have to navigate to `http://0.0.0.0:8000/en/` or whichever language you want to actually see all the changes. Either way, make sure the url ends with `/`.
8. When satisfied with your changes, stop the script with `ctrl` + `c`. Use the command `npm run save-pages` to update the gatsby wiki. This will commit changes with the date as the commit message `"Page built on date +"%d-%m-%Y %T"`

## Updating the Live Wiki

If you just want to deploy without previewing first then run `npm run just-deploy`.

## Directly build and preview

If you already made your changes and just want to quickly build and start the preview in the browser then run `npm run preview`.

> Note: this will not deploy automatically, you will need to run `npm run save-page` to update the gatsby wiki.
