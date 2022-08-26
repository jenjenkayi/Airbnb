'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' })
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
}, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};