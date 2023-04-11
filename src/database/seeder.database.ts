import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import options from "../config/typeorm.config";

const run = async () => {
    const argv = process.argv.slice(2);
    const argc = argv.length;

    if (argc === 0) {
        console.log("Usage: yarn seed <path of seeder>");
        process.exit();
    }

    const dataSource = new DataSource(options);
    await dataSource.initialize();
    await runSeeders(dataSource, { seeds: [argv[0]], factoriesLoad: false });
    await dataSource.destroy();
};

run();