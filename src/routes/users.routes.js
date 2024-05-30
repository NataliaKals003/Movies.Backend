const { Router, response } = require('express');
const UserController = require('../controllers/UsersController');
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const usersRoutes = Router();
const userController = new UserController();
const upload = multer(uploadConfig.MULTER);

usersRoutes.post('/', userController.create);
usersRoutes.put('/', ensureAuthenticated, userController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), (request, response) => {
    response.json();
})


module.exports = usersRoutes;