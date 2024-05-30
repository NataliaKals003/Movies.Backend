const { Router, response } = require('express');
const UserController = require('../controllers/UsersController');
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const UserAvatarController = require('../controllers/UserAvatarController');

const usersRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.MULTER);

usersRoutes.post('/', userController.create);
usersRoutes.put('/', ensureAuthenticated, userController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);


module.exports = usersRoutes;