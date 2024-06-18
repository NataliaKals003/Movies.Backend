const knex = require('../database/knex');

class NotesRepository {
    async create({ title, description, rating, tags, user_id }) {

        const [note] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        }).returning('id');

        const note_id = note.id;

        if (tags && tags.length > 0) {
            const tagsInsert = tags.map(name => ({
                note_id,
                name,
                user_id
            }));
            await knex("movie_tags").insert(tagsInsert);
        }
        return note_id
    }

    async getOne({ id, user_id }) {
        const movieNote = await knex("movie_notes")
            .join('users', 'movie_notes.user_id', '=', 'users.id')
            .where({
                'movie_notes.id': id,
                'movie_notes.user_id': user_id
            })
            .select(
                'movie_notes.*',
                'users.name as user_name',
                'users.email as user_email',
                'users.avatar as user_avatar'
            )
            .first();

        return movieNote;
    }

    async getTagsByNoteId(note_id) {
        const movieTags = await knex("movie_tags")
            .where({ note_id })
            .orderBy("name");

        return movieTags;
    }

    async getAll({ user_id }) {
        const notes = await knex("movie_notes")
            .join('users', 'movie_notes.user_id', '=', 'users.id')
            .where('movie_notes.user_id', user_id)
            .select(
                'movie_notes.*',
                'users.name as user_name',
                'users.email as user_email',
                'users.avatar as user_avatar'
            );

        return notes;
    }

    async delete({ id }) {
        await knex("movie_notes")
            .where({ id })
            .del();
    }
}

module.exports = NotesRepository;