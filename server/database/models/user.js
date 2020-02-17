/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['client', 'staff'],
    },
    isAdmin: DataTypes.BOOLEAN,
    countryCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    enable2FA: DataTypes.BOOLEAN,
    authyID: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Account, {
      foreignKey: 'owner',
      as: 'accounts'
    });
  };
  // eslint-disable-next-line func-names
  User.beforeCreate(function (user) {
    user.password = user.hashPassword();
    user.email = user.email.toLowerCase();
  });
  User.prototype.hashPassword = function hashPassword() {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(this.password, salt);
  };
  User.prototype.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};