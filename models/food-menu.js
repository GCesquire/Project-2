module.exports = (sequelize, DataTypes) => {
  let FoodMenu = sequelize.define("FoodMenu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT,
    stockQty: DataTypes.INT,
    allergies: DataTypes.STRING,
    modifications: DataTypes.BOOLEAN,
    category: DataTypes.STRING
  });
  return FoodMenu;
};
