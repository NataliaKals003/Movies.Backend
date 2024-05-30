const { Router } = require('express')
const movieNotesRoutes = Router()
const MovieNotesController = require('../controllers/MovieNotesController')

const movieNotesController = new MovieNotesController()

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.get('/', movieNotesController.getAll);
movieNotesRoutes.post('/', movieNotesController.create);
movieNotesRoutes.get('/:id', movieNotesController.getOne);
movieNotesRoutes.delete("/:id", movieNotesController.delete);


module.exports = movieNotesRoutes