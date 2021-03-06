import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById, resolveMultiByQuery} from '../resolveHelper';

// import FriendType, {resolveMulti as resolveFriends} from './FriendType';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import ProjetConnection from '../projets/projetConnection';

export default new GraphQLObjectType({
  name: 'User',
  description: 'Un User',
  fields: () => ({
    id: globalIdField('User', (parent) => parent._id),
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
    },
    friends: {
      type: new GraphQLList(GraphQLString),
      description: 'Friends list'
      // resolve: me => resolveFriends({ids: me.friends})
    },
    projets: ProjetConnection
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('User', 'User', id, getProjection(info));
}

export function resolveMulti(ids, info) {
  return resolveMultiByQuery(
    'User', 'User', {_id: {$in: ids}}, getProjection(info)
  );
}
