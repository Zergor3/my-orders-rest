import { Sequelize } from 'sequelize';
import config from './index.js';

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});

export default sequelize;