import Order from '../models/Order.js';
import { OrderLine, Product } from '../models/OrderLine.js';

export const createOrder = async (req, res) => {
    try {
        const { orderNumber, orderLines } = req.body;
        let totalPrice = 0;
        for (let line of orderLines) {
            const product = await Product.findByPk(line.productId);
            if (product) {
                totalPrice += product.price * line.quantity;
            }
        }
        const order = await Order.create({ orderNumber, totalPrice });
        if (orderLines && orderLines.length) {
            for (let line of orderLines) {
                await OrderLine.create({ orderId: order.id, productId: line.productId, quantity: line.quantity });
            }
        }
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({ include: [{ model: OrderLine, as: 'orderLines' }] });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [{
                model: OrderLine,
                as: 'orderLines',
                include: [{ model: Product, as: 'product' }]
            }]
        });
        if (!order) {
            return res.status(404).json({ message: 'Orden not found' });
        }
        const result = {
            id: order.id,
            orderNumber: order.orderNumber,
            date: order.date,
            totalPrice: order.totalPrice,
            orderLines: order.orderLines.map(line => ({
                productId: line.productId,  
                quantity: line.quantity,
                name: line.product.name,   
                price: line.product.price   
            }))
        };
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderNumber, orderLines } = req.body;

        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Orden not found' });

        // Calcular el nuevo precio total
        let totalPrice = 0;
        for (let line of orderLines) {
            const product = await Product.findByPk(line.productId);
            if (product) {
                totalPrice += product.price * line.quantity;
            }
        }

        await order.update({ orderNumber, totalPrice });
        await OrderLine.destroy({ where: { orderId: id } });

        if (orderLines && orderLines.length) {
            for (let line of orderLines) {
                await OrderLine.create({ orderId: id, productId: line.productId, quantity: line.quantity });
            }
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) return res.status(404).json({ message: 'Orden not found' });

        await order.destroy();
        res.json({ message: 'Orden deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};