module.exports = (sequelize, DataTypes) => {
  let Restaurant = sequelize.define("Restaurant", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Restaurant;
};
