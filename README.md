# better-note

<h1 align="center">:pencil2: :notebook_with_decorative_cover: BetterNote :notebook_with_decorative_cover: :pencil2:</h1>

<h3 align="center"> :books: https://better-note-app.herokuapp.com :books:</h3>

BetterNote is a simple app for organizing and taking notes.

## Table Of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Technologies](#technologies)
- [Contributors](#contributors)

## Description

BetterNote is a full-stack application for note-taking and organization.  A user will be able to read, post, and edit notes as well as store sets of notes in notebooks.

## Getting Started

To run this project, download or clone from the terminal.
```
git clone https://github.com/thisismydisplay/better-note/
```

From the root directory, cd into ```./backend``` and create a ```.env``` file based on ```.env.example```.

Setup a PostgreSQL user with CREATEDB privileges and password that matches your .env file. 

Run ```npm install``` to install dependencies.

Run ```npx dotenv sequelize db:create``` (Alternatively, create the database manually in PostgreSQL)

At any time, to migrate and re-seed the database, ```npm run cleanSlate``` will run the following commands:

```
npx dotenv sequelize db:seed:undo:all 
npx dotenv sequelize db:migrate:undo:all 
npx dotenv sequelize db:migrate 
npx dotenv sequelize db:seed:all"
```

Start server with ```npm start```.

From the root directory, cd into ```./frontend``` and run ```npm install``` to install dependencies.

Run ```npm start``` to launch the application.


```
cd backend
touch .env
npm install
/* update .env based on .env.example */
/* create PostgreSQL user based on .env */
npx dotenv sequelize db:create 
npm run cleanSlate
npm start
cd ../frontend
npm install
npm start
```

(Note: ```.nvmrc``` included to alert that nvm v16.13.2 is known to be stable; other nvm versions may cause errors.)

## Heroku Deployment

1. Create a new [Heroku project](https://dashboard.heroku.com/apps)
2. Under Resources click 'Find more add-ons' and add 'Heroku Postgres'
3. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
4. Run ```heroku login``` to login to Heroku in your terminal
5. Add Heroku as a remote to your project's git repository 
```heroku git:remote -a <name-of-Heroku-app>```
6. Scripts already exist in the package.json in the root directory for install, heroku-postbuild, sequelize, and start
7. From the application's Heroku Dashboard, navigate to settings, click 'Config Vars', and update the ```JWT_EXPIRES_IN``` and ```JWT_SECRET```
8. Push to heroku by running ```git push heroku main```
9. Migrate and seed the production database by running ```npm run herokuCleanSlate``` 
-this command can also be used to reset the database at anytime

Checkout the [wiki](https://github.com/thisismydisplay/better-note/wiki) to learn more about BetterNote routes and design.

## Technologies

-   [React](https://reactjs.org/docs/getting-started.html)
-   [Redux](https://redux.js.org/introduction/getting-started)
-   [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
-   [Express](https://expressjs.com/)
-   [Sequelize](https://sequelize.org/)
-   [PostgreSQL](https://www.postgresql.org/docs/)
-   [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
-   [CSS](https://developer.mozilla.org/en-US/docs/Web/css)

## Contributors

[thisismydisplay](https://github.com/thisismydisplay)
