const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository; //declarando o userRepository como global dentro da classe
    }

    async execute({ name, email, password }) {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('This email is in use.');
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });
        return userCreated;
    }

    async update({ user_id, name, email, password, old_password }) {

        let user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found")
        }

        if (email !== user.email) {
            const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

            if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
                throw new AppError("Email is already in use")
            }
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (password && !old_password) {
            throw new AppError('You have to informate the old password');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError('The old password is incorrect.')
            }

            user.password = await hash(password, 8)
        }

        await this.userRepository.update({
            name: user.name,
            email: user.email,
            password: user.password,
            user_id: user.id  // Passa o ID do usuário para a atualização
        });

    }
};

module.exports = UserService;