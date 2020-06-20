/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    email: 'johndoe@kudi.com',
    firstName: 'John',
    lastName: 'Doe',
    password: '$2a$12$cgB3a2.KkzF5BVEbYtv2ge2EgH7qy9G7NQpZDk7KC563oBM7KWf2q',
    type: 'staff',
    isAdmin: true,
    profileImage: 'https://res.cloudinary.com/ridumatics/image/upload/v1583229535/elo88g1sndlyf7ylcx63.jpg',
    countryCode: '234',
    phoneNumber: '+2348122689423',
    enable2FA: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', [{
    first_name: 'John'
  }])
};