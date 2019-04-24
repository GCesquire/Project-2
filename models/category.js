module.exports = (sequelize, DataTypes) => {
  let Category = sequelize.define("Category", {
    name: DataTypes.STRING
  });

  Category.associate = models => {
    // Associating Category with Food/Drink items
    // When Category is deleted, also delete any associated food items
    Category.hasMany(models.FoodMenu, {
      onDelete: "cascade"
    });
    Category.hasMany(models.DrinkMenu, {
      onDelete: "cascade"
    });
  };

  return Category;
};
