import { Sequelize } from 'sequelize';
import { dotenvLoad } from "dotenv-mono";

const dotenv = dotenvLoad();

// Sequlize connection setup
export const sequelize = new Sequelize(
    'bookview_db',
    `${process.env.DB_USERNAME}`,
    `${process.env.DB_PASSWORD}`,
    {
        dialect: 'postgres',
        host: `${process.env.DB_HOST}`,
        port: 5432,
        native: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 10000,
            idle: 10000,
            evict: 20000,
        },
        logging: false,
        timezone: '+05:30'
    }
);

