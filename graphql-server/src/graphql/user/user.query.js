export const Query = {
  getUser: async (obj, args, { db, decoded }) => {
    if (!decoded) {
      throw new Error('Authorization failed');
    }
    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      throw new Error('Authorization failed');
    }

    return user;
  },
};
