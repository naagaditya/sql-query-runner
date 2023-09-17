## Instruction to run in local
`npm install` && `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Link to application
Open [https://naagaditya.github.io/sql-query-runner/](https://naagaditya.github.io/sql-query-runner/) to test the application.

## Instruction to execute query
By default I have added the Users table. You can run select query on users table.
### Sample Queries
1. SELECT * FROM Users;
2. SELECT firstName, age FROM Users;
3. SELECT firstName, age FROM Users WHERE gender = 'male';
4. SELECT firstName, age FROM Users WHERE NOT gender = 'male';
5. SELECT firstName, age FROM Users WHERE gender = 'male' AND age > 30;
6. SELECT firstName, age FROM Users WHERE gender = 'male' OR age > 30;

### Import a table
You can import a table either by JSON or CSV
1. Click on import table button on top right corner.
2. type a Table name.
3. paste array of JSON or CSV on the table text-area and click import.
Now you will be able to run query on imported table using the table name you provided.

## Get sample dummy data
1. JSON: https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json
2. CSV: https://github.com/graphql-compose/graphql-compose-examples/blob/master/examples/northwind/data/csv/suppliers.csv?plain=1

## DEMO


https://github.com/naagaditya/sql-query-runner/assets/20066919/3e795160-1e44-418a-9b4a-135e02323b73

