import { User } from "../entities/user.entity"

export default class UserRepository {
    /**
     * Geet all active users
     * @returns User[]
     */
    public getAllUsers = async (): Promise<User[]> => {
        const users = await User.find();

        return users;
    }
}