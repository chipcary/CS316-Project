# CS316 Final Project

This directory contains our final project plus both previous milestones. All final code resides in the /project directory.

## Running the Project

1. Install npm packages: You may have to run `npm install` in the /project, /project/server, and /project/frontend directories to get the required dependences.
2. Create the db, frontend, and server: In the /project directory, simply run
```bash
npm run start:all
``` 

## Project Contents

1. DB
 
 Contains SQL, scripts, and sample data to load the database. create.sql is the file used to create DB schema, constraints, triggers, and indices. Sample data is divided between /largedb and /smalldb. /largedb contains CSV files to load 50,000 rows into the database to test higher loads and provide sample data for the application. /smalldb was used in testing the backend before sample data was available. reset_largedb.sh and reset_smalldb.sh create or reset the db with the large and small datasets respectively.

2. Frontend

 React App that provides the frontend interface for our web application. Calls the backend to perform database CRUD operations. Dynamically renders the UI to the user. 

3. Server

 Expressjs server that handles all communication with the database. Implements all operations that read or modify the db and exposes an API for the use of the frontend. Uses sequelize as an ORM to abstract db operations and as automatic protection against SQL injections. Implements pagination for queries that can return large numbers of tuples. Response times (other than encryption/decryption) are all ~50ms or less. Test the server with `npm test`