// Load environmental variables
import dotenv from 'dotenv';
dotenv.config();

import path from "path";
import { DataSourceOptions } from "typeorm"
import { SeederOptions } from 'typeorm-extension';
import { User } from "../entities/user.entity";

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User],
    migrations: [path.join(__dirname, '../database/migrations/*.ts')],
    seeds:[path.join(__dirname, '../database/seeders/*.ts')]
};

export default options;