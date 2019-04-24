module.exports = (sequelize, DataTypes) => {
  let Table = sequelize.define("Table", {
    tableNumber: DataTypes.INTEGER,
    guestQty: DataTypes.INTEGER
  });
  return Table;
};
