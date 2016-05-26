var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../data/schema.json');
// importer le schema qu'on a créer en backend et on fait valider nos requetes
module.exports = { plugins: [getbabelRelayPlugin(schema.data)] };
