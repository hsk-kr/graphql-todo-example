export const TodoMap = {
  user: (obj, args, {db}) => db.user.findByPk(obj.userid)
};
