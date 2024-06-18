const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const UserRepository = require('../repositores/UserRepository');
const UserService = require('../services/UserService');

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);

        await userService.execute({ name, email, password });

        return response.json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        await userService.update({ user_id, name, email, password, old_password });



        return response.json()
    }
}

module.exports = UsersController