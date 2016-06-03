import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById} from '../resolveHelper';
import SpendingConnection from '../spendings/SpendingConnection';
import OwnerType, {resolveMulti as resolveUsers} from './ProjetOwnerType';
import _ from 'lodash';

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
    city: {
      type: GraphQLString,
      description: 'Projet Type'
    },
    participants: {
      type: new GraphQLList(OwnerType),
      description: 'Projet Type',
      resolve: (projet, args, context, info) => resolveUsers(projet.participants, info)
        .then(users => {
          return _.map(users, user => {
            user._typeName = 'ProjetOwner';
            console.log(user);
            return user;
          })
        })
    },
    totalSpendings: {
      type: GraphQLString,
      description: 'total spendings'
    },
    spendings: SpendingConnection,
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('Projet', 'Projet', id, getProjection(info));
}
