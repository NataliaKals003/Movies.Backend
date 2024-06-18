const TagsRepository = require('../repositores/TagsRepository');
const TagsService = require('../services/TagsService');

class MovieTagsController {
    async getAll(request, response) {
        const user_id = request.user.id;

        const tagsRepository = new TagsRepository();
        const tagsService = new TagsService(tagsRepository);

        const movie_tags = await tagsService.createTag(user_id);

        return response.json(movie_tags);
    }
}

module.exports = MovieTagsController;