const knex = require('../database/knex');
const NotesRepository = require('../repositores/NotesRepository');
const NotesService = require('../services/NotesService');


class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        const notesRepository = new NotesRepository();
        const notesService = new NotesService(notesRepository);

        const note_id = await notesService.create({ title, description, rating, tags, user_id });

        return response.json({ note_id });
    }

    async getOne(request, response) {
        const { id } = request.params;
        const user_id = request.user.id

        const notesRepository = new NotesRepository();
        const notesService = new NotesService(notesRepository);

        const note = await notesService.getOne({ id, user_id });
        return response.status(201).json(note);
    }

    async getAll(request, response) {
        const { title, rating, tags } = request.query;
        const user_id = request.user.id;

        const notesRepository = new NotesRepository();
        const notesService = new NotesService(notesRepository);

        const note = await notesService.getAll({ title, rating, tags, user_id });

        return response.json(note);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }
}

module.exports = MovieNotesController;