var config = {}

config.host = process.env.DOCUMENTDB_ENDPOINT;
config.authKey = process.env.DOCUMENTDB_PRIMARY_KEY;
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;
