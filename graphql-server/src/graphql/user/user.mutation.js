import { authenticateGoogle } from '../../auth';

export const Mutation = {
  signInWithGoogle: async (obj, args, { db, req, res }) => {
    // insert a token into the request.
    req.body = {
      ...req.body,
      access_token: args.accessToken,
    };

    try {
      const { data, info } = await authenticateGoogle(req, res);

      if (data) {
        // obtain an email from the google profile
        const {
          profile: {
            _json: { email },
          },
        } = data;

        const user = await db.User.findOne({ where: { email } });

        if (user) {
          // returns a existing user with token.
          const token = user.generateToken();
          return {
            user,
            token,
          };
        } else {
          // create a new user and returns with token
          const newUser = await db.User.create({ email });
          const token = newUser.generateToken();
          return {
            user: newUser,
            token,
          };
        }
      } else if (info) {
        throw new Error(`Something went wrong`);
      }
    } catch (err) {
      throw err;
    }

    return null;
  },
};
