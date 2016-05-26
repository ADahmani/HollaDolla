import Queries from './Queries';
import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';
var _ = require('lodash');

var querySet = {};

Queries.forEach(set => {
  querySet = _.extend(querySet, set);
});

// var mutationSet = {};
//
// require('./Mutations').forEach(set => {
//   mutationSet = _.extend(mutationSet, set);
// });

var RootSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: querySet
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'RootMutationType',
  //   fields: mutationSet
  // })

});

export default RootSchema;
