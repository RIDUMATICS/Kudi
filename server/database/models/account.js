/* eslint-disable no-param-reassign */
import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    accountNumber: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    createdOn: DataTypes.DATE,
    owner: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM,
      values: ['savings', 'current'],
    },
    status: {
      type: DataTypes.ENUM,
      values: ['draft', 'active', 'dormant'],
    },
    balance: DataTypes.FLOAT
  }, {});
  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: 'owner',
      as: 'user'
    });
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
      targetKey: 'accountNumber',
      as: 'transactions'
    });
  };
  Account.beforeCreate((account) => {
    account.accountNumber = Math.floor(Math.random() * 10 ** 10);
    account.createdOn = moment().valueOf();
    account.status = 'draft';
    account.balance = 0.0;
  });
  return Account;
};