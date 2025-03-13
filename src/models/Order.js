import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { OrderLine } from './OrderLine.js';

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderNumber: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    totalPrice: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0 }
}, { timestamps: false });

Order.hasMany(OrderLine, { foreignKey: 'orderId', as: 'orderLines', onDelete: 'CASCADE' });
OrderLine.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

export default Order;