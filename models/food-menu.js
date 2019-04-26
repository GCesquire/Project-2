module.exports = (sequelize, DataTypes) => {
  let FoodMenu = sequelize.define("FoodMenu", {
    name: DataTypes.STRING,
    wholesalePrice: DataTypes.FLOAT,
    retailPrice: DataTypes.FLOAT,
    stockQty: DataTypes.INTEGER,
    allergies: DataTypes.STRING,
    modifications: DataTypes.STRING
  });

  FoodMenu.associate = models => {
    // Food item from FoodMenu should belong to a certain Category
    // A food item can't be created without a Category due to the foreign key constraint
    FoodMenu.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return FoodMenu;
};
