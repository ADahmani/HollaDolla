import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById, resolveMultiByQuery} from '../resolveHelper';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Friend',
  description: 'Un Friend',
  fields: () => ({
    id: globalIdField('Friend', (parent) => parent._id),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id'
    },
    first_name: {
      type: GraphQLString,
      description: 'Friend first name'
    },
    last_name: {
      type: GraphQLString,
      description: 'Friend last name'
    },
    email: {
      type: GraphQLString,
      description: 'Friend email'
    }
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('User', 'User', id, getProjection(info));
}

export function resolveMulti(ids, info) {
  return resolveMultiByQuery('User', 'User', ids, getProjection(info));
}
