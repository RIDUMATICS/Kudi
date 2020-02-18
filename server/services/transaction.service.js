import _ from 'lodash';
import { Account, Transaction } from '../database/models';

/** service that allows cashier perform transaction of user's account */
class TransactionService {
  /**
   * @description debit user account
   * @param {object} a new transaction object
   */

  static async debitAccount(cashier, accountNumber, amount) {
    try {
      const account = await Account.findOne({ where: { accountNumber } });

      if (account) {
        if (account.status === 'dormant' || account.status === 'draft') {
          const error = new Error(`You can't perform a transaction on a ${account.status} account`);
          error.status = 400;
          throw error;
        }
        if (account.balance >= amount) {
          const oldBalance = account.balance;
          const newBalance = oldBalance - amount;
          account.balance = newBalance;
          await account.save();
          const transaction = await Transaction.create({
            type: 'debit',
            accountNumber,
            cashier,
            amount,
            oldBalance,
            newBalance
          });
          return _.pick(transaction, ['id', 'accountNumber', 'createdOn', 'cashier', 'type', 'amount', 'oldBalance', 'newBalance']);
        }
        const error = new Error('account balance is not sufficient');
        error.status = 400;
        throw error;
      }
      const error = new Error('account number doesn\'t exist');
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }

  /**
   * @description credit user account
   * @param {object} a new transaction object
   */

  static async creditAccount(cashier, accountNumber, amount) {
    try {
      const account = await Account.findOne({ where: { accountNumber } });

      if (account) {
        if (account.status === 'dormant' || account.status === 'draft') {
          const error = new Error(`You can't perform a transaction on a ${account.status} account`);
          error.status = 400;
          throw error;
        }
        const oldBalance = account.balance;
        const newBalance = oldBalance + amount;
        account.balance = newBalance;
        await account.save();
        const transaction = await Transaction.create({
          type: 'credit',
          accountNumber,
          cashier,
          amount,
          oldBalance,
          newBalance
        });
        return _.pick(transaction, ['id', 'accountNumber', 'createdOn', 'cashier', 'type', 'amount', 'oldBalance', 'newBalance']);
      }
      const error = new Error('account number doesn\'t exist');
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }

  /**
   * @description this function fetches a user account's account transactions
   * @param {object} response
   */
  static async getAllTransactions(accountNumber, owner) {
    try {
      const foundAccount = await Account.findOne({ where: { accountNumber, owner } });

      if (foundAccount) {
        const transactions = await Transaction.findAll({
          where: { accountNumber }
        });
        return transactions.map((transaction) => _.pick(transaction, ['createdOn', 'type', 'accountNumber', 'cashier', 'amount', 'oldBalance', 'newBalance']));
      }
      const error = new Error('account number doesn\'t exist');
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }

  /**
   * @description this function fetches a single user transaction
   * @param {object} response
   */
  static async getTransaction(transactionId, owner) {
    try {
      let transaction = await Transaction.findOne({
        where: { id: transactionId },
        include: {
          model: Account,
          as: 'account'
        }
      });

      if (transaction) {
        transaction = _.pick(transaction, ['createdOn', 'type', 'cashier', 'amount', 'oldBalance', 'newBalance', 'account.accountNumber', 'account.type', 'account.balance', 'account.owner']);
        if (transaction.account.owner !== owner) {
          const error = new Error('transaction id doesn\'t exist');
          error.status = 404;
          throw error;
        }
        return transaction;
      }
      const error = new Error('transaction id doesn\'t exist');
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }
}

export default TransactionService;