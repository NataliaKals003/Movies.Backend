const { Router } = require('express');
const usersRoutes = Router();
const UserController = require('../controllers/UsersController');
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userController = new UserController();
usersRoutes.post('/', userController.create);
usersRoutes.put('/', ensureAuthenticated, userController.update);

module.exports = usersRoutes;