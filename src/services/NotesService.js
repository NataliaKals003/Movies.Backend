class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }

    async create({ title, description, rating, tags, user_id }) {
        const note_id = await this.notesRepository.create({ title, description, rating, tags, user_id });
        return note_id;
    }

    async getOne({ id, user_id }) {
        const movieNote = await this.notesRepository.getOne({ id, user_id });
        const movieTags = await this.notesRepository.getTagsByNoteId(id);

        return {
            ...movieNote,
            movie_tags: movieTags
        };
    }

    async getAll({ user_id }) {
        const notes = await this.notesRepository.getAll({ user_id });
        return notes;
    }

    async delete({ id }) {
        await this.notesRepository.delete({ id });
    }
}

module.exports = NotesService; 