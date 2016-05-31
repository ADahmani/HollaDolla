var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../data/schema2.json');
// importer le schema qu'on a créer en backend et on fait valider nos requetes
module.exports = { plugins: [getbabelRelayPlugin(schema.data)] };


// 'use strict'
//
// const getBabelRelayPlugin = require('babel-relay-plugin')
// const introspectionQuery = require('graphql/utilities').introspectionQuery
// const request = require('sync-request')
//
// const url = "http://localhost:3333/graphql";
//
// const response = request('POST', url, {
//   qs: {
//     query: introspectionQuery
//   }
// })
//
// const schema = JSON.parse(response.body.toString('utf-8'))
//
// module.exports = { plugins: [getBabelRelayPlugin(schema.data, { abortOnError: true })] }
