import { DataSource } from "typeorm";
import options from "../config/typeorm.config";

const AppDataSource = new DataSource(options);

export default AppDataSource;