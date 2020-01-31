export const TodoMap = {
  user: (obj, args, { db }) => db.User.findByPk(obj.userid),
};
