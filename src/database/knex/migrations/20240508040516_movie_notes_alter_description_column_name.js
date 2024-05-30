exports.up = knex => knex.schema.table("movie_notes", table => {
    table.renameColumn("descriptions", "description");
});

exports.down = knex => knex.schema.table("movie_notes", table => {
    table.renameColumn("description", "descriptions");
});
