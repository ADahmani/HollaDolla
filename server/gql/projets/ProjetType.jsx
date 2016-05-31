import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById} from '../resolveHelper';

import OwnerType, {resolveMulti as resolveUsers} from './ProjetOwnerType';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Projet',
  description: 'Un Projet',
  fields: () => ({
    id: globalIdField('Projet', (parent) => parent._id),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id'
    },
    name: {
      type: GraphQLString,
      description: 'Projet Name'
    },
    type: {
      type: GraphQLString,
      description: 'Projet Type'
    },
    participants: {
      type: new GraphQLList(OwnerType),
      description: 'Projet Type',
      resolve: projet => resolveUsers({ids: projet.participants})
    }
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('Projet', 'Projet', id, getProjection(info));
}
