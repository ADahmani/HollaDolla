import mongoose from 'mongoose';
import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById, resolveMultiByQuery} from '../resolveHelper';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'ProjetOwner',
  description: 'A projet Owner',
  fields: () => ({
    id: globalIdField('ProjetOwner', (parent) => parent._id),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id'
    },
    first_name: {
      type: GraphQLString,
      description: 'User first name'
    },
    last_name: {
      type: GraphQLString,
      description: 'User last name'
    },
    email: {
      type: GraphQLString,
      description: 'User email'
    }
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('User', 'User', id, getProjection(info));
}

export function resolveMulti(ids, info) {
  return resolveMultiByQuery(
    'User', 'User', {_id: {$in: ids}}, getProjection(info)
  );}
