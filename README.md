## Instruction to run in local
### `npm install`
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Instruction to execute query
By default I have added the Users table. You can run select query on users table.
### Sample Queries
1. SELECT * FROM Users;
2. SELECT firstName, age FROM Users;
3. SELECT firstName, age FROM Users WHERE gender = 'male';
4. SELECT firstName, age FROM Users WHERE gender = 'male' AND age > 30;
5. SELECT firstName, age FROM Users WHERE gender = 'male' OR age > 30;

### Import a table
1. Click on import table button on top right corner.
2. type a Table name.
3. paste array of row(JSON) on the table text-area and click import.
Now you will be able to run query on imported table using the table name you provided.

## Get sample dummy data
https://microsoftedge.github.io/Demos/json-dummy-data/
