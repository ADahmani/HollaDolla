import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById} from '../resolveHelper';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
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
    }
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('Projet', 'Projet', id, getProjection(info));
}
