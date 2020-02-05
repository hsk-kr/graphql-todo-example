import { verifyDecoded } from '../../auth/jwt';
import { Op } from 'sequelize';

export const Mutation = {
  createTodo: async (obj, { title, description, x, y }, { db, decoded }) => {
    verifyDecoded(decoded);

    const newTodo = await db.Todo.create({
      title,
      description,
      x: x,
      y: y,
      userid: decoded.id,
    });

    if (!newTodo) {
      throw new Error('Failed to create a todo');
    }

    return newTodo;
  },
  updateTodo: async (obj, args, { db, decoded }) => {
    verifyDecoded(decoded);

    const fields = { ...args };
    delete fields.id;

    const [numberOfaffectedRows, affectedRows] = await db.Todo.update(
      { ...fields },
      {
        where: {
          [Op.and]: [{ id: args.id }, { userid: decoded.id }],
        },
      }
    );

    return numberOfaffectedRows > 0;
  },
  deleteTodo: async (obj, args, { db, decoded }) => {
    verifyDecoded(decoded);

    const numberOfaffectedRows = await db.Todo.destroy({
      where: {
        [Op.and]: [{ id: args.id }, { userid: decoded.id }],
      },
    });

    return numberOfaffectedRows > 0;
  },
};
