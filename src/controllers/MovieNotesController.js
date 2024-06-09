const knex = require('../database/knex');

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        if (tags && tags.length > 0) {
            const tagsInsert = tags.map(name => {
                return {
                    note_id,
                    name,
                    user_id
                }
            });
            await knex("movie_tags").insert(tagsInsert);
        }

        return response.json();
    }

    async getOne(request, response) {
        const { id } = request.params;

        const movie_notes = await knex("movie_notes")
            .join('users', 'movie_notes.user_id', '=', 'users.id')
            .where('movie_notes.id', id)
            .select(
                'movie_notes.*',
                'users.name as user_name',
                'users.email as user_email',
                'users.avatar as user_avatar'
            )
            .first();

        const movie_tags = await knex("movie_tags")
            .where({ note_id: id }).orderBy("name");

        return response.json({
            ...movie_notes,
            movie_tags
        });
    }

    async getAll(request, response) {
        const { title, rating, tags } = request.query;

        const user_id = request.user.id;
        let movie_notes;

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            movie_notes = await knex("movie_notes")
                .select([
                    "movie_notes.id",
                    "movie_notes.title",
                    "movie_notes.description",
                    "movie_notes.rating",
                    "movie_notes.user_id",
                ])
                .leftJoin("movie_tags", "movie_notes.id", "movie_tags.note_id")
                .groupBy("movie_notes.id")
                .where({ "movie_notes.user_id": user_id })
                .where("movie_notes.title", "like", `%${title}%`)
                .whereIn("movie_tags.name", filterTags)
                .orderBy("movie_notes.title");
        } else {
            movie_notes = await knex("movie_notes")
                .select("*")
                .where({ user_id })
                .where("title", "like", `%${title}%`)
                .modify(queryBuilder => {
                    if (rating) queryBuilder.where({ rating });
                })
                .orderBy("title");
        }

        const userTags = await knex("movie_tags").where({ user_id });

        const notesWithTags = movie_notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id).map(tag => tag.name);

            return {
                ...note,
                tags: noteTags
            };
        });

        return response.json(notesWithTags);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }
}

module.exports = MovieNotesController;