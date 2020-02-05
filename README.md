# GraphQL Todo Example

Only supports development.

## Setup

### Local

#### Prerequisite

- Google Auth Client Id, Client Secrect
- Maria or MySQL
- Created database (depends on .env)

#### Steps

##### Server

1. Move to the graphql-server directory
2. Create .env file and set environment variables you can check the file 'example.env'
3. Run command `npx sequelize-cli db:migrate` to create tables
4. Run command `npm run install` to install dependencies
5. Run command `npm run start` to start the GraphQL server

##### Client

1. Move to the webclient directory.
2. Set 'GOOGLE_CLIENT_ID', 'GRAPHQL_SERVER_URI' variables in constants.js file under shared directory
3. Run command `npm run install` to install dependencies
4. Run command `npm run start` to start the React dev server

### Docker

#### Prerequisite

- Docker

#### Steps

1. Move to the graphql-server directory
2. Create .env file and set environment variables you can check the file 'example.env'
3. Change dockerfile paths, ports, maria environment variables depends on .env in docker-compose.yml
4. Run command `docker-compose up`

## Server

- apollo-server-express
- passport-google-token
- sequelize (Maria)

## Client

- React
- Bootstrap
- Apollo


## Preview
![Preview](https://github.com/hsk-kr/graphql-todo-example/blob/master/screenshot/preview.gif?raw=true)