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
  name: 'Spender',
  description: 'Un Spender',
  fields: () => ({
    id: globalIdField('Spender', (parent) => parent._id),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id'
    },
    first_name: {
      type: GraphQLString,
      description: 'Spender first name'
    },
    last_name: {
      type: GraphQLString,
      description: 'Spender last name'
    },
    email: {
      type: GraphQLString,
      description: 'Spender email'
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
