const TagsService = require('./TagsService');
const TagsRepositoryInMemory = require('../repositores/TagsRepositoryInMemory')

it("tags should have an id", async () => {
    const tagData1 = { user_id: 1, name: 'Action' };
    const tagData2 = { user_id: 1, name: 'Adventure' };
    const tagData3 = { user_id: 5, name: 'Adventure' };

    const tagsRepository = new TagsRepositoryInMemory();
    const tagsService = new TagsService(tagsRepository);

    await tagsService.createTag(tagData1);
    await tagsService.createTag(tagData2);
    await tagsService.createTag(tagData3);

    const tagsForUser1 = await tagsRepository.getAll(1);
    console.log("tags user 1:", tagsForUser1)


    expect(tagsForUser1).toHaveLength(2);
    tagsForUser1.forEach(tag => {
        expect(tag).toHaveProperty('id'); // Verifica se a tag possui a propriedade 'id'
        expect(tag.id).toBeGreaterThan(0); // Verifica se o 'id' é um número positivo
    });


});