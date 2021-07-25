'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
         len:[2,20],
      }
    },
    // name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      allowNull:true,
      unique:true,
      validate:{
        isEmail:true,
        max:25,
      }
    },
    // password: DataTypes.STRING,
    password:{
      type:DataTypes.STRING,
      allowNull:true,
      validate:{
        max:20,
        notEmpty:true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });
  return user;
};