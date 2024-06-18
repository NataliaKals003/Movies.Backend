class TagsService {
    constructor(tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    async createTag(tagData) {
        const tag = await this.tagsRepository.create(tagData);
        return tag;
    }
}

module.exports = TagsService;