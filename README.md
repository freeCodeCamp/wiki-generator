# Scripts for deploying the wiki to gh-pages

## Setup
1. `npm install`
3. `chmod 744 install.sh`
2. `./install.sh`
3. `chmod 744 deploy.sh`

## To Run Locally
`./local.sh`.
This will update your local copy from the main wiki repo, and serve it on `localhost:8000`.
When satisfied with your changes, run `./print.sh`

## To Update the Gatsby-Wiki Repo
(hopefully after having 'printed')
`./deploy.sh`
