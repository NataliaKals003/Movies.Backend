const knex = require('../database/knex');

class TagsRepository {

    async getAll(user_id) {
        const movie_tags = await knex("movie_tags")
            .where({ user_id })
            .groupBy("name")

        return movie_tags;
    }

}

module.exports = TagsRepository;