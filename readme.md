# T-E-N-T
## Typescript + Express + Node + TypeORM

TENT is a project template for working with Typescript, Express, NodeJS and TypeORM.

### Project Setup
1. Download the project from github and save it locally
2. Copy the .env.sample to .env
3. Alter the .env file to set a **JWT_SECRET** and **DB_NAME**

### Running the application
By default the application runs on port 5000. You can change this in the **.env** file, if you change the port and you are using docker you will need to expose your new port in the **Dockerfile**

 - Using Docker
	 - The project already comes with a docker and docker-compose setup files. This is the easiest and quickest way to get up and running.
	 - `cd to/project/path`
	 - `docker compose up -d`
 - Without Docker
	 - If you are not using docker, then you will need to setup a database server and configure the .env file to connect to your database server.
	 - `yarn install`
	 - `yarn debug`

### Database Migrations
Database migrations use TypeORM, see more detailed documentation here: https://typeorm.io/migrations
- Creating a database migrations
	- `yarn migration:create <path to migration>`
- Example: create a new table called `clients`
		- `yarn migration:create ./src/database/migrations/create_clients_table`

**Example migration:**
```ts
import { MigrationInterface, QueryRunner, Table } from  "typeorm"

export  class  CreateClientsTable1681087352933  implements  MigrationInterface {
    public  async  up(queryRunner: QueryRunner): Promise<void> {
        const  usersTable = new  Table({
            name:  "clients",
            columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "first_name", type: "varchar", length: '255' },
                { name: "last_name", type: "varchar", length: '255' },
            ]
        });

        await  queryRunner.createTable(usersTable, true);
    }

    public  async  down(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.dropTable('clients');
    }
}
```

- Running database migrations
	- `yarn migration:run`

### Database Seeding
Database seeding is a process of populating a database with initial or sample data to help developers test and develop an application.

**Creating seeds**
Database seeds are simple classes that inherit from a Seeder class that have a `run` function that specifies the data to insert into the database. Seed files are located in **src/database/seeds**

**Example Seeder**
```ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Client } from '../../entities/client.entity';

export default class ClientSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        // Truncate tables
        await dataSource.query("TRUNCATE TABLE clients");

        // Create test clients
        const clientA = new Client();
        clientA.first_name = "John";
        clientB.last_name = "Doe";
        await clientA.save();

        const clientA = new Client();
        clientA.first_name = "Jane";
        clientB.last_name = "Citizen";
        await clientA.save();
    }
}
```

**Running seeds**

### Routing
To add additional routes to your application you will need to add them into the `defineRoutes()` function located in **src/config/routes.config.ts**
Routes are defined using the express router api - https://expressjs.com/en/guide/routing.html

**Example routes:**
```ts
const  defineRoutes = () => {
    // ...Previously defined routes 
    const clientController = new ClientController();
    const clientValidator = new ClientValidator();
    router.get("/clients/list", clientController.listClients);
    router.post("/clients/new", [protectedRoute, clientValidator.newClientValidation()], clientController.newClient);

    return  router;
}
```

### Controllers
Controllers are basic classes that inherit from a base controller class, these are used to process requests from the router.

**Example controller:**
```ts
class ClientController extends BaseController {
    /**
     * List all clients
     * GET: /clients/list
     */ 
    public listClients = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        // Retrieve clients from the db using a repository class
        const clientRepos = new ClientRepository();
        const clients = await clientRepos.getAllClients();
    
        // Return JSON to the user
        return response.send({ clients: clients });
    }
}
```

###  Repositories
Repositories are basic classes that contain functions that return data from the database that can be re-used throughout the application.

**Example repository:**
```ts
import { Client } from  "../entities/client.entity"

export default class ClientRepository {
    // Get all clients
    public getAllClients = async (): Promise<Client[]> => {
        const clients = await Client.find();

        return clients;
    }
}
```

### Testing

This project uses `jest` and `supertest` to perform automated testing.

**Integration Tests**
These are tests that create a http connection to your application and test your routes that may contain multiple chunks of code from business logic to saving data into your database. They test the interaction and communication between different parts of an application, rather than testing each part in isolation.

**Example:**
```ts
import 'jest';
import * as express from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('client integration tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });

    it('can list clients', async () => {
        const response = await request(app)
            .get('/clients/list')
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);

        expect(response.body).toHaveProperty('clients');
        expect(response.body.users).toHaveLength(2);
    });
});
```

**Unit Tests**
These are tests that check the functionality of individual code units or components in isolation from the rest of the application. A code unit can be a function, method, or class, and unit tests typically focus on testing the inputs and outputs of these units.

**Example:**
```ts
import 'jest';
import ClientRepository from "../../src/repositories/client.repository";

describe("Client Repository", () => {
    let repository: ClientRepository

    beforeEach(() => {
        repository = new ClientRepository();
    });

    it("should get all active users", async () => {
        const clients = await repository.getAllClients();
        expect(clients).toHaveLength(2);
    });
});
```
