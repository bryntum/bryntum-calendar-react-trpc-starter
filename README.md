
# Create a Bryntum Calendar using React, tRPC, Express, Sequelize, and SQLite

This starter template is an npm workspaces TypeScript monorepo that contains a React client app and an Express server app. The client uses [Vite](https://vite.dev/), a development server and bundler, and the server uses Express, [Sequelize ORM](https://sequelize.org/), and SQLite. 

## Server app code

The following code is added to the server app to create a local SQLite database populated with example Bryntum Calendar data:

- **Sequelize instantiation code** (`server/src/config/database.ts`): This creates a Sequelize instance using a local SQLite database and stores it as a `database.sqlite3` file in the `server` folder.
- **Example data** (`server/src/initialData`): This contains the example JSON data for events and resources, which is used to populate the database.
- **Sequelize data models** (`server/src/models`): This contains the Sequelize models used to define the structure of the Bryntum Calendar database tables.
- **Database seeding script** (`server/src/addExampleData.ts`): This Node.js script uses Sequelize to create a local SQLite database and populate it with the example data.

The following npm packages are added to the server app:

- `sequelize`
- `sqlite3`
- `cors`

## Install the dependencies

Install the dependencies by running the following command: 

```sh
npm install
```

## Create and populate a local SQLite database

Navigate to the `server` directory:

```sh
cd server
```

Run the `addExampleData.ts` script to create a local SQLite database and populate it with the example calendar data in `server/src/initialData`:

```sh
npx tsx ./src/addExampleData.ts
```

## Run the client and server apps

Run the local dev servers for the client and server using the following command:

```sh
npm run dev
```

This uses the npm package `concurrently` to run the client app and the server app simultaneously.

You can access the client app at [`http://localhost:5173`](http://localhost:5173) and the server app at [`http://localhost:4000`](http://localhost:4000).

If you open the client app in your browser, you'll see the text "App component", which is rendered by the `client/src/App.tsx` component.

## Adding npm packages to the client or server app

To add an npm package to the correct app, use the `--workspace` flag with the `npm install` command.

For example, to add the `zod` npm package to the `server`, use the following command from the root directory:

```sh
npm install zod --workspace=server
```
