export const TodoMap = {
  user: (obj, args, { db }) => db.User.findByPk(obj.userid),
  position: obj => ({ x: obj.x, y: obj.y }),
};
