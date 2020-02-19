import _ from 'lodash';
import { config } from 'dotenv';
import { hashSync } from 'bcryptjs';
import { registerAuthy, sendAutyToken, verifyAuthyToken } from '../utils/authyHelper';
import genToken from '../utils/generateToken';
import { User } from '../database/models';
import sendMail from '../utils/email';
import messageTemplate from '../utils/messageTemplate';

config();

/** Class that allows user create and login  */
class UserService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */
  static async createUser(user, profileImage) {
    try {
      const isUser = await User.findOne({ where: { email: user.email } });
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
      const user = await User.findOne({ where: { email } });
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
        const { dataValues } = await User.findOne({ where: { email: payload.user } });
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

  static async createAStaff(staff, profileImage) {
    // eslint-disable-next-line no-useless-catch
    try {
      const isStaff = await User.findOne({ where: { email: staff.email } });

      if (isStaff) {
        const err = new Error(`a ${isStaff.type} with this email address already exist`);
        err.status = 409;
        throw err;
      }

      const newStaff = { ...staff, type: 'staff', profileImage: profileImage.secure_url };

      const { dataValues } = await User.create(newStaff);

      await sendMail(staff.email, 'An account has been created for you on KUDI', messageTemplate.staffCreated(staff));

      return {
        staff: _.omit(dataValues, ['password', 'updatedAt', 'createdAt'])
      };
    } catch (err) {
      err.status = err.status || 500;
      throw err;
    }
  }

  static async updateDetails(user, email) {
    try {
      const foundUser = await User.findOne({ where: { email } });

      if (foundUser) {
        if (await user.enable2FA) {
          const resp = await registerAuthy(foundUser);
          // eslint-disable-next-line no-param-reassign
          user.authyID = resp.user.id;
        }

        if (await user.password) {
          if (!user.oldPassword || !foundUser.validatePassword(user.oldPassword)) {
            const error = new Error('Incorrect previous password');
            error.status = 400;
            throw error;
          }
          // eslint-disable-next-line no-param-reassign
          user.password = hashSync(user.password, 12);
        }
        const { dataValues } = await foundUser.update(user);
        return _.omit(dataValues, ['createdAt', 'updatedAt', 'password']);
      }
      const error = new Error('User account doesn\'t exist');
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }
}

export default UserService;