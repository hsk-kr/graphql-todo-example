import { verifyDecoded } from '../../auth/jwt';

export const Query = {
  getUser: async (obj, args, { db, decoded }) => {
    verifyDecoded(decoded);
    const user = await db.User.findByPk(decoded.id);

    if (!user) {
      throw new Error('Authorization failed');
    }

    return user;
  },
};
