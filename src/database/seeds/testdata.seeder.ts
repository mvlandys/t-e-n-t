import bcrypt from 'bcryptjs';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../entities/user.entity';

export default class TestDataSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        // Truncate tables
        await dataSource.query("TRUNCATE TABLE users");

        // Create test users
        const users = ["user_1@test.com", "user_2@test.com", "user_3@test.com"];
        for (const k in users) {
            const username = users[k];
            const user = new User();
            user.username = username;
            user.password = await bcrypt.hash("Abcd1234", 10);
            await user.save();
        }
    }
}