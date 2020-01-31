import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: 'User',
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Todo, { as: 'todos' });
  };

  // instance Methods
  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  };

  return User;
};
