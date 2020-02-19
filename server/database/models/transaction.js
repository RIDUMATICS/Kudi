import moment from 'moment';

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    createdOn: DataTypes.DATE,
    type: {
      type: DataTypes.ENUM,
      values: ['Credit', 'Debit'],
    },
    accountNumber: DataTypes.BIGINT,
    cashier: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    oldBalance: DataTypes.FLOAT,
    newBalance: DataTypes.FLOAT
  }, {});
  Transaction.associate = (models) => {
    // associations can be defined here
    Transaction.belongsTo(models.Account, {
      foreignKey: 'accountNumber',
      targetKey: 'accountNumber',
      as: 'account'
    });
  };
  Transaction.beforeCreate((transaction) => {
    // eslint-disable-next-line no-param-reassign
    transaction.createdOn = moment().valueOf();
  });
  return Transaction;
};