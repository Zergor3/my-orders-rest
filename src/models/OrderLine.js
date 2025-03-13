import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const OrderLine = sequelize.define('OrderLine', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false }
}, { timestamps: false });

Product.hasMany(OrderLine, { as: 'orderLines', foreignKey: 'productId' });
OrderLine.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

export { OrderLine, Product };