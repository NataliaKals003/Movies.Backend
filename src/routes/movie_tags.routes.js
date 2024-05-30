const { Router } = require('express');
const movieTagsRoutes = Router();
const MovieTagsController = require('../controllers/MovieTagsController');

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const movieTagsController = new MovieTagsController()


movieTagsRoutes.get('/', ensureAuthenticated, movieTagsController.getAll);

module.exports = movieTagsRoutes