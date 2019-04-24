module.exports = (sequelize, DataTypes) => {
  let Tables = sequelize.define("Tables", {
    tableNumber: DataTypes.INT,
    guestQty: DataTypes.INT
  });
  return Tables;
};
