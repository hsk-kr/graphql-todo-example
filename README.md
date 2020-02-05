# GraphQL Todo Example

## Setup

### Prerequisite

- Google Auth Client Id, Client Secrect
- Maria or MySQL
- Created database (depends on .env)

### Steps

#### Server

1. Move to the graphql-server directory
2. Create and set variables .env file. you can check the file 'example.env'
3. Run command `npx sequelize-cli db:migrate` to create tables
4. Run command `npm run install` to install dependencies
5. Run command `npm run start` to start the GraphQL server

#### Client

1. Move to the webclient directory.
2. Set 'GOOGLE_CLIENT_ID', 'GRAPHQL_SERVER_URI' variables in constants.js file under shared directory
3. Run command `npm run install` to install dependencies
4. Run command `npm run start` to start the React dev server

## Server

- apollo-server-express
- passport-google-token
- sequelize (Maria)

## Client

- React
- Bootstrap
- Apollo
