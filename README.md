# better-note

<h1 align="center">:pencil2: BetterNote :notebook_with_decorative_cover:</h1>

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

Run ```npm install``` to install dependencies.

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
npm run cleanSlate
npm start
cd ../frontend
npm install
npm start
```

(Note: ```.nvmrc``` included to alert that nvm v16.13.2 is known to be stable; other nvm versions may cause errors.)

Checkout the [wiki](https://github.com/thisismydisplay/better-note/wiki) to learn more about BetterNote routes and design.

## Technologies

-   [React](https://reactjs.org/docs/getting-started.html)
-   [Redux](https://redux.js.org/introduction/getting-started)
-   [Sequelize](https://sequelize.org/)
-   [Express](https://expressjs.com/)

## Contributors

[thisismydisplay](https://github.com/thisismydisplay)
