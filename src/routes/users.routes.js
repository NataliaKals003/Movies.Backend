const { Router } = require('express');
const usersRoutes = Router();
const UserController = require('../controllers/UsersController');

const userController = new UserController();
usersRoutes.post('/', userController.create);
usersRoutes.put('/:id', userController.update);

module.exports = usersRoutes;