import { getTokenDecodedFromRequest } from '../../auth/jwt';

export const Query = {
  getUser: async (obj, { token }, { req, db }) => {
    const { id } = getTokenDecodedFromRequest(req);
    const user = await db.User.findByPk(id);

    if (!user) {
      throw new Error('Authorization failed');
    }

    return user;
  },
};
