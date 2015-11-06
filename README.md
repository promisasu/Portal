# Pain Reporting Portal

[![Build Status](https://travis-ci.org/ser515asu/PRP-Manhattan-Project.svg?branch=master)](https://travis-ci.org/ser515asu/PRP-Manhattan-Project)
[![Dependency Status](https://david-dm.org/ser515asu/PRP-Manhattan-Project.svg)](https://david-dm.org/ser515asu/PRP-Manhattan-Project)

### Installation Instructions
1. install [Node JS](https://nodejs.org/en/download/)
2. install [MySql](https://www.mysql.com/)
3. clone git repository `git clone https://github.com/ser515asu/PRP-Manhattan-Project`
4. run `npm install`
5. run `npm install --global gulpjs/gulp-cli#4.0`

### Setup Instructions
1. if you do not already have a database user, create one
2. create a new empty database `CREATE SCHEMA prp_development;`
3. run `gulp init`
4. run `gulp sync`

### Start the Portal
1. run `gulp start`

### Test the Portal
*Ensure that there is a database named `prp_test`*

1. run `gulp test`

### View Code Documentation
1. run `gulp doc`
2. open `documentation/index.html` in a browser

### View All Server Tasks
1. run `gulp --tasks`
