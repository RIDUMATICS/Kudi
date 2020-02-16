import {
  User,
  Account
} from '../database/models';


/** service that allows user create bank account, delete bank account */
class AccountService {
  /**
   * @description Create a new user
   * @param {object} a new user object
   */

  static async createAccount({ type }, { id }) {
    try {
      const user = await User.findOne({
        where: {
          id
        }
      }); // check if user already exist
      if (user) {
        const account = await Account.findAll({
          where: {
            owner: id
          },
        });

        if (account.length > 0) {
          if (account.length === 2) {
            const err = new Error(`user already have a savings and current accounts - ${account[0].accountNumber} and ${account[1].accountNumber} `);
            err.status = 409;
            throw err;
          }

          if (account[0].type === type) {
            const err = new Error(`user already have a ${type} account : ${account[0].accountNumber}`);
            err.status = 409;
          }
        }

        // create a new bank account
        const newAccount = await Account.create({
          owner: id,
          type,
        });


        return newAccount;
      }

      const err = new Error('user doesn\'t exist');
      err.status = 400;
      throw err;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }
}

export default AccountService;