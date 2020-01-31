import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import db from './database/models';
import { resolver as resolvers, schema } from './graphql';
import * as dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req, res }) => ({ req, res, db }),
});

const app = express();
server.applyMiddleware({ app });

app.listen(process.env.PORT, () =>
  console.log(`Server ready at http://localhost:4000`)
);
