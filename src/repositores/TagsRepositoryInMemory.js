class TagsRepositoryInMemory {
    tags = [];

    async create({ user_id, name }) {
        const tag = {
            id: Math.floor(Math.random() * 1000) + 1,
            user_id,
            name,
        };

        console.log('Tag created:', tag);
        this.tags.push(tag);
        return tag;
    }

    async getAll(user_id) {
        //  console.log('Get all tags for user_id:', user_id);
        // Filtra as tags associadas ao user_id especificado
        return this.tags.filter(tag => tag.user_id === user_id);
    }
}

module.exports = TagsRepositoryInMemory;