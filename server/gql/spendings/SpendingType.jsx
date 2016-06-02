import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import {getProjection} from '../Util';
import {resolveSingleById} from '../resolveHelper';

import SpenderType, {resolveSingle as resolveUser} from './SpenderType.jsx';

import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Spending',
  description: 'Un Spending',
  fields: () => ({
    id: globalIdField('Spending', (parent) => parent._id),
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id'
    },
    projet: {
      type: GraphQLString,
      description: 'Spending in projet'
    },
    amount: {
      type: GraphQLString,
      description: 'Amount spent'
    },
    from: {
      type: SpenderType,
      description: 'giver',
      resolve: spending => resolveUser(spending.from)
    },
    to: {
      type: SpenderType,
      description: 'taker',
      resolve: spending => resolveUser(spending.to)
    }
  }),
  interfaces: [nodeInterface]
});

export function resolveSingle(id, info) {
  return resolveSingleById('Spending', 'Spending', id, getProjection(info));
}
