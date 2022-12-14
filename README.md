# Math Squared

## What is this?

This is a full-stack app for people to practice arithmatic, with addition, subtraction, multiplication, and division problems that increase in difficulty.

Users can optionally create an account to save their high score.

## Technologies Used

### Backend

-   bcrypt
-   CORS
-   Dotenv
-   Express
-   Helmet
-   jsonschema
-   jsonwebtoken
-   morgan
-   pg
-   PostgreSQL

### Frontend

-   Axios
-   Bulma CSS
-   Concurrently
-   Create React App
-   js-cookie
-   React
-   React Router Dom
-   Redux Toolkit

## Installing on your Machine

First clone or download this repository.

## Setting Up the Backend

Change directories into the "backend" folder and then install the dependencies with npm.

```
cd backend
npm install
// or
npm install --save-dev // if you plan to run tests later, install the dev dependencies
```

If PostgreSQL is not on your machine, go ahead and install it now. Make sure the PostgreSQL server is running and create two databases: one for the main app and one for running tests. On Ubuntu the commands for this would be:

```
sudo service postgresql start
createdb math_games // DB for main app.
createdb math_games_test // DB for running tests.
```

Run the two sql files using PostgreSQL, to set up the tables in the main app and test databases.

```
psql < data.sql
psql < dataTest.sql
```

### Setting Up the Frontend

Change directories into the "frontend" folder and install the dependencies with npm.

```
cd ../frontend
npm install --save-dev // to use concurrently package install the dev dependencies
```

### Running the Frontend and Backend

You can run the frontend and backend with one command using the Concurrently package.

```
npm run dev
```

Now the app should be running in your favorite browser.

## Tests

Tests for the frontend or the backend can be run using Jest and SuperTest.

### Testing Backend

Change directories into the "backend" folder and run the `npm test` script.

```
cd backend
npm test
```

### Testing Frontend

Change directories into the "frontend" folder and run the `npm test` script.

```
cd frontend
npm test
```

## Author

Quentin Ikeno
