module.exports = (sequelize, DataTypes) => {
  let Restaurant = sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Restaurant.associate = models => {
    // Associating Restaurant with employees
    // When Restaurant is deleted, also delete any associated workers
    // Restaurant.hasMany(models.Waiter, {
    //   onDelete: "cascade"
    // });
    // Restaurant.hasMany(models.Category, {
    //   onDelete: "cascade"
    // });
    Restaurant.hasMany(models.Table, {
      onDelete: "cascade"
    });
    // Restaurant.hasMany(models.FoodMenu, {
    //   onDelete: "cascade"
    // });
  };

  return Restaurant;
};
