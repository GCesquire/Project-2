module.exports = (sequelize, DataTypes) => {
  let Restaurants = sequelize.define("Restaurants", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Restaurants;
};
