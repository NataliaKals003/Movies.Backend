const { Router } = require('express')
const movieNotesRoutes = Router()
const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesController = new MovieNotesController()


movieNotesRoutes.get('/', movieNotesController.getAll);
movieNotesRoutes.post('/:user_id', movieNotesController.create);
movieNotesRoutes.get('/:id', movieNotesController.getOne);
movieNotesRoutes.delete("/:id", movieNotesController.delete);


module.exports = movieNotesRoutes