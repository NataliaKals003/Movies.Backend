const { Router } = require('express')
const movieTagsRoutes = Router()
const MovieTagsController = require('../controllers/MovieTagsController')

const movieTagsController = new MovieTagsController()


movieTagsRoutes.get('/:user_id', movieTagsController.getAll);

module.exports = movieTagsRoutes