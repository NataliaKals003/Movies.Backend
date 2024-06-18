const UserService = require('./UserService');
const UserRepositoryInMemory = require('../repositores/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe("UserService", () => {

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        };
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userService = new UserService(userRepositoryInMemory);
        const userCreated = await userService.execute(user);

        expect(userCreated).toHaveProperty("id")
    });

    it("user should not be create with exists email", async () => {
        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password: "123"
        };
        const user2 = {
            name: "User test 2",
            email: "user@test.com",
            password: "1234"
        };

        const userRepository = new UserRepositoryInMemory();
        const userService = new UserService(userRepository);

        await userService.execute(user1);
        await expect(userService.execute(user2)).rejects.toEqual(new AppError('This email is in use.'));


    });
})
