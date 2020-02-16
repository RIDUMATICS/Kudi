module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accountNumber: {
      type: Sequelize.BIGINT
    },
    createdOn: {
      type: Sequelize.DATE
    },
    owner: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.ENUM,
      values: ['savings', 'current'],
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['draft', 'active', 'dormant'],
      allowNull: false,
    },
    balance: {
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
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Accounts')
};