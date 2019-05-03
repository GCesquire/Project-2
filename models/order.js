module.exports = (sequelize, DataTypes) => {
  let Order = sequelize.define("Order", {
    item: DataTypes.STRING,
    itemQty: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    table: DataTypes.INTEGER
  });

  Order.associate = models => {
    Order.belongsTo(models.Table);
  };

  return Order;
};
