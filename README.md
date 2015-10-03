# Pain Reporting Portal

### Installation Instructions
1. Install [Node JS](https://nodejs.org/en/download/)
2. Install [MySql](https://www.mysql.com/)
3. clone git repository `git clone https://github.com/ser515asu/PRP-Manhattan-Project`
4. run `npm install`
5. run `npm link .`

### Setup Instructions
1. If you do not already have a database user, create one
2. create a new empty database `CREATE SCHEMA prp_development;`
3. run `prp init`
4. run `prp sync`

### Start the Portal
1. run `prp start`

### Test the Portal
1. run `npm test`

### View Code Documentation
1. run `npm run-script doc`
2. open `docs/index.html`
