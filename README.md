## Overview
Author: Adam Zimmer
Purpose: Adcellerant Code Challenge

This repository includes
1. web app container:
* ReactJS
* HTML
* CSS
* Material UI

2. web server container:
* node.js
* express

3. postgres container

## Running The Application
This application uses docker. To build the 3 images run `docker-compose build` and then `docker-compose up` to start the application.

The web app runs on localhost:3000 and the server on localhose:3001

## Notes
* The ad sources (Facebook, Google, etc.) at the top of the Product Campaign Insights chart are clickable and will toggle ithe data in and out of the chart.
* In a real scenario the .env file would be included in the .gitignore.
* Redux is installed in the web app but I didn't need to use any actions or reducers as the server does most of the heavy lifting
* I wanted to use knex or sequelize as an ORM on the web server but didn't have time to implement it.
