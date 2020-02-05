import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import db, { sequelize } from './database/models';
import { resolver as resolvers, schema } from './graphql';
import * as dotenv from 'dotenv';
import { getTokenFromReq, getUserFromToken } from './auth/jwt';
import cors from 'cors';

dotenv.config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  context: ({ req, res }) => {
    const token = getTokenFromReq(req);
    let decoded = null;
    if (token) {
      decoded = getUserFromToken(token);
    }
    return { req, res, db, token, decoded };
  },
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen(process.env.PORT, () =>
  console.log(`Server ready at PORT ${process.env.PORT}`)
);
