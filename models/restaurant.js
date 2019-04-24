module.exports = (sequelize, DataTypes) => {
  let Restaurant = sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });
  Restaurant.associate = models => {
    // Associating Restaurant with employees
    // When Restaurant is deleted, also delete any associated workers
    Restaurant.hasMany(models.Waiter, {
      onDelete: "cascade"
    });
  };

  return Restaurant;
};
