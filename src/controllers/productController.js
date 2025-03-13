import { Product } from "../models/OrderLine.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const product = await Product.create({ name, price });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};