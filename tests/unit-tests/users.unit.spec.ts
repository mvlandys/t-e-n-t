import 'jest';
import UserRepository from "../../src/repositories/user.repository";

describe("Users Repository", () => {
    let repository: UserRepository

    beforeEach(() => {
        repository = new UserRepository();
    });

    it("should get all active users", async () => {
        const users = await repository.getAllUsers();
        expect(users).toHaveLength(3);
    });
});