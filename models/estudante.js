'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estudante.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    idade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudante',
  });
  return Estudante;
};