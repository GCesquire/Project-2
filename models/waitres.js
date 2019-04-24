module.exports = (sequelize, DataTypes) => {
  let Waiters = sequelize.define("Waiters", {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Waiters;
};
