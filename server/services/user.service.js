import _ from 'lodash';
import { config } from 'dotenv';
import { registerAuthy, sendAutyToken, verifyAuthyToken } from '../utils/authyHelper';
import genToken from '../utils/generateToken';
import { User } from '../database/models';

config();

/** Class that allows user create and login  */
class UserService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */
  static async createUser(user, profileImage) {
    try {
      const isUser = await User.findByPk(user.email);
      let authyID;

      if (isUser) {
        const error = new Error('Email has already been taken.');
        error.status = 409;
        throw error;
      }

      if (await user.enable2FA) {
        const resp = await registerAuthy(user);
        authyID = resp.user.id;
      }


      const {
        dataValues
      } = await User.create({
        ...user,
        type: 'client',
        isAdmin: false,
        profileImage: profileImage.secure_url,
        authyID
      });

      const token = genToken(_.omit(dataValues, ['enable2FA']));

      return {
        token,
        user: _.omit(dataValues, ['password', 'updatedAt', 'createdAt'])
      };
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }

  /**
   * @description signs user into their account
   * @param {object} a new user object
   */

  static async signUser({
    email,
    password
  }) {
    try {
      const user = await User.findByPk(email);
      if (user) {
        const isValid = user.validatePassword(password);

        if (isValid) {
          const token = genToken(user);

          if (await user.dataValues.enable2FA) {
            await sendAutyToken(user.dataValues);
            return {
              token,
              user: { enable2FA: user.dataValues.enable2FA }
            };
          }
          return {
            token,
            user: _.omit(user.dataValues, ['password', 'updatedAt', 'createdAt'])
          };
        }
      }

      const error = new Error('The email and password you entered did not match our records. Please double-check and try again.');
      error.status = 401;
      throw error;
    } catch (err) {
      err.status = err.status || 500;
      throw err;
    }
  }

  static async verifyToken({ authyToken }, payload) {
    try {
      if (payload.allowOnly2FA) {
        const { dataValues } = await User.findByPk(payload.user);
        await verifyAuthyToken(dataValues.authyID, authyToken);

        const token = genToken(_.omit(dataValues, ['enable2FA']));

        return {
          token,
          user: _.omit(dataValues, ['password', 'updatedAt', 'createdAt'])
        };
      }
      const error = new Error('Enable 2FA is not set');
      error.status = 401;
      throw error;
    } catch (err) {
      err.status = err.status || 500;
      throw err;
    }
  }
}

export default UserService;