module.exports = (sequelize, DataTypes) => {
  let Waiter = sequelize.define("Waiter", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Waiter;
};
