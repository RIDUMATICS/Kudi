/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    createdOn: {
      type: Sequelize.DATE
    },
    type: {
      type: Sequelize.ENUM,
      values: ['Credit', 'Debit'],
      allowNull: false,
    },
    accountNumber: {
      type: Sequelize.BIGINT
    },
    desc: {
      type: Sequelize.STRING
    },
    cashier: {
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.FLOAT
    },
    oldBalance: {
      type: Sequelize.FLOAT
    },
    newBalance: {
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions')
};