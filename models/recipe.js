'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  recipe.init({
    recipe_title: DataTypes.STRING,
    recipe_url: DataTypes.STRING,
    recipe_cost: DataTypes.INTEGER,
    recipe_time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recipe',
    underscored: true,
  });
  return recipe;
};