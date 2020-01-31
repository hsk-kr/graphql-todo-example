import { verifyDecoded } from '../../auth/jwt';

export const Query = {
  myTodos: async (obj, args, { db, decoded }) => {
    verifyDecoded(decoded);

    const todos = await db.Todo.findAll({ where: { userid: decoded.id } });

    return todos;
  },
};
