module.exports = (sequelize, DataTypes) => {
  let DrinkMenu = sequelize.define("DrinkMenu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT,
    category: DataTypes.STRING
  });
  return DrinkMenu;
};
