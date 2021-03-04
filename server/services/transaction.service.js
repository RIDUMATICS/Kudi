import _ from 'lodash';
import { User, Account, Transaction } from '../database/models';
import sendMail from '../utils/email';
import messageTemplate from '../utils/messageTemplate';
import sendSMS from '../utils/smsNotification';

/** service that allows cashier perform transaction of user's account */
class TransactionService {
  /**
   * @description debit user account
   * @param {object} a new transaction object
   */

  static async debitAccount(cashier, accountNumber, amount) {
    try {
      const account = await Account.findOne({
        where: { accountNumber },
        include: {
          model: User,
          as: 'user'
        }
      });

      if (account) {
        if (account.status === 'dormant' || account.status === 'draft') {
          const error = new Error(
            `You can't perform a transaction on a ${account.status} account`
          );
          error.status = 400;
          throw error;
        }
        if (account.balance >= amount) {
          const oldBalance = account.balance;
          const newBalance = oldBalance - amount;
          account.balance = newBalance;
          await account.save();
          const transaction = await Transaction.create({
            type: 'Debit',
            desc: 'Bank Withdraw',
            accountNumber,
            cashier,
            amount,
            oldBalance,
            newBalance
          });
          await sendMail(
            account.user.email,
            'Debit Transaction Alert',
            messageTemplate.transactionMessage(account.user, transaction)
          );
          await sendSMS(
            messageTemplate.alert(transaction),
            account.user.phoneNumber
          );
          return _.pick(transaction, [
            'id',
            'accountNumber',
            'createdOn',
            'cashier',
            'type',
            'amount',
            'oldBalance',
            'newBalance'
          ]);
        }
        const error = new Error('account balance is not sufficient');
        error.status = 400;
        throw error;
      }
      const error = new Error("account number doesn't exist");
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
      const account = await Account.findOne({
        where: { accountNumber },
        include: {
          model: User,
          as: 'user'
        }
      });

      if (account) {
        if (account.status === 'dormant' || account.status === 'draft') {
          const error = new Error(
            `You can't perform a transaction on a ${account.status} account`
          );
          error.status = 400;
          throw error;
        }
        const oldBalance = account.balance;
        const newBalance = oldBalance + amount;
        account.balance = newBalance;
        await account.save();
        const transaction = await Transaction.create({
          type: 'Credit',
          desc: 'Bank Deposit',
          accountNumber,
          cashier,
          amount,
          oldBalance,
          newBalance
        });

        await sendMail(
          account.user.email,
          'Credit Transaction Alert',
          messageTemplate.transactionMessage(account.user, transaction)
        );
        await sendSMS(
          messageTemplate.alert(transaction),
          account.user.phoneNumber
        );
        return _.pick(transaction, [
          'id',
          'accountNumber',
          'createdOn',
          'cashier',
          'type',
          'amount',
          'oldBalance',
          'newBalance'
        ]);
      }
      const error = new Error("account number doesn't exist");
      error.status = 404;
      throw error;
    } catch (error) {
      console.log(error);
      error.status = error.status || 500;
      throw error;
    }
  }

  /**
   * @description Transfer
   * @param {object} a new transaction object
   */

  static async transferAccount(
    senderAccountNumber,
    receiverAccountNumber,
    password,
    amount
  ) {
    try {
      if (senderAccountNumber === receiverAccountNumber) {
        const error = new Error('Invalid transfer to same account');
        error.status = 400;
        throw error;
      }

      const senderAccount = await Account.findOne({
        where: { accountNumber: senderAccountNumber },
        include: {
          model: User,
          as: 'user'
        }
      });

      const receiverAccount = await Account.findOne({
        where: { accountNumber: receiverAccountNumber },
        include: {
          model: User,
          as: 'user'
        }
      });
      if (senderAccount) {
        // confirm the sender password is correct
        if (!senderAccount.user.validatePassword(password)) {
          const error = new Error('Incorrect password');
          error.status = 400;
          throw error;
        }

        // check if the sender account is dormant or draft
        if (
          senderAccount.status === 'dormant'
          || senderAccount.status === 'draft'
        ) {
          const error = new Error(
            `You can't perform a transaction on a ${senderAccount.status} account`
          );
          error.status = 400;
          throw error;
        }

        // check if the user have sufficient amount
        if (senderAccount.balance < amount) {
          const error = new Error('account balance is not sufficient');
          error.status = 400;
          throw error;
        }

        const oldBalance = senderAccount.balance;
        const newBalance = oldBalance - amount;
        senderAccount.balance = newBalance;
        await senderAccount.save();

        const receiverOldBalance = receiverAccount.balance;
        const receiverNewBalance = receiverOldBalance + amount;
        receiverAccount.balance = receiverNewBalance;
        await receiverAccount.save();

        const transaction = await Transaction.bulkCreate([
          {
            type: 'Debit',
            desc: `Transfer to ${receiverAccount.user.firstName.toUpperCase()} ${receiverAccount.user.lastName.toUpperCase()}`,
            accountNumber: senderAccountNumber,
            amount,
            oldBalance,
            newBalance,
            createdOn: new Date()
          },
          {
            type: 'Credit',
            desc: `Transfer from ${senderAccount.user.firstName.toUpperCase()} ${senderAccount.user.lastName.toUpperCase()}`,
            accountNumber: receiverAccountNumber,
            amount,
            oldBalance: receiverOldBalance,
            newBalance: receiverNewBalance,
            createdOn: new Date()
          }
        ]);

        return transaction;
      }

      // if the sender account is not valid
      const error = new Error("account number doesn't exist");
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
      const foundAccount = await Account.findOne({
        where: { accountNumber, owner }
      });

      if (foundAccount) {
        const transactions = await Transaction.findAll({
          where: { accountNumber }
        });
        return transactions.map((transaction) => _.pick(transaction, [
          'createdOn',
          'type',
          'desc',
          'accountNumber',
          'cashier',
          'amount',
          'oldBalance',
          'newBalance'
        ]));
      }
      const error = new Error("account number doesn't exist");
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
        transaction = _.pick(transaction, [
          'createdOn',
          'type',
          'cashier',
          'amount',
          'oldBalance',
          'newBalance',
          'account.accountNumber',
          'account.type',
          'account.balance',
          'account.owner'
        ]);
        if (transaction.account.owner !== owner) {
          const error = new Error("transaction id doesn't exist");
          error.status = 404;
          throw error;
        }
        return transaction;
      }
      const error = new Error("transaction id doesn't exist");
      error.status = 404;
      throw error;
    } catch (error) {
      error.status = error.status || 500;
      throw error;
    }
  }
}

export default TransactionService;
