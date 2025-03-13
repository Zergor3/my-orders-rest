import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import config from './config/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar:', err));

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));