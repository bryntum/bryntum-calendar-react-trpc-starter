
# Create a Bryntum Calendar using React, tRPC, Express, Sequelize, and SQLite

This starter template is an npm workspaces TypeScript monorepo that contains a React client app and an Express server app. The client uses [Vite](https://vite.dev/), which is a development server and bundler. The server uses Express, [Sequelize ORM](https://sequelize.org/), and SQLite. 

## Code added to the server app to create and populate a local SQLite database

The following code was added for creating a local SQLite database populated with example Bryntum Calendar data:

- **Sequelize instantiation code** (`server/src/config/database.ts`): Code to create a Sequelize instance that uses a local SQLite database, stored as a `database.sqlite3` file in the `server` folder.
- **Example data** (`server/src/initialData`): Example JSON data for events and resources, used to populate the database.
- **Sequelize data models** (`server/src/models`): Sequelize models to define the structure of the Bryntum Calendar database tables.
- **Database seeding script** (`server/src/addExampleData.ts`): A Node.js script that uses Sequelize to create a local SQLite database and populate it with the example data.

The following npm packages were added:

- `sequelize`
- `sqlite3`

The `cors` npm package was also added to the server app to enable CORS.

## Install the dependencies

Install the dependencies by running the following command: 

```sh
npm install
```

## Create and populate a local SQLite database

Create and populate a local SQLite database with the example calendar data in `server/src/initialData` by first moving into the `server` directory:

```sh
cd server
```

Next, run the `addExampleData.ts` script:

```sh
npx tsx ./src/addExampleData.ts
```

## Running the client and server apps at the same time

Run the local dev servers for the client and server using the following command:

```sh
npm run dev
```

This runs the client app and server app concurrently using the npm package `concurrently`.

You can access the client app at [`http://localhost:5173`](http://localhost:5173) and the server app at [`http://localhost:4000`](http://localhost:4000).

If you open the client app in your browser, you'll see the text "App component", which is rendered by the `client/src/App.tsx` component.

## Adding npm packages to the client or server app

To add an npm package to the correct app, use the `--workspace` flag with the `npm install` command. For example, to add the `zod` npm package to the `server`, use the following command from the root directory:

```sh
npm install zod --workspace=server
```