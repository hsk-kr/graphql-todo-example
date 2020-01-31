import { Query } from './todo.query';
import { TodoMap } from './todo.map';
import { Mutation } from './todo.mutation';

export const resolver = {
  Query,
  Mutation,
  Todo: TodoMap
};