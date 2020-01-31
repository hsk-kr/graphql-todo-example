import { Query } from './user.query';
import { UserMap } from './user.map';
import { Mutation } from './user.mutation';

export const resolver = {
  Query,
  Mutation,
  User: UserMap
};