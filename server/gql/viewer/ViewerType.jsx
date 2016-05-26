import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;

import {
  GraphQLObjectType,
} from 'graphql';

import ProjetConnection from '../projets/projetConnection';
const TYPE_NAME = 'Viewer';

export default new GraphQLObjectType({
  name: TYPE_NAME,
  description: 'Entry point',
  fields: () => ({
    id: globalIdField(TYPE_NAME, () => 0),
    projets: ProjetConnection
  }),
  interfaces: [nodeInterface],
});

export function resolveSingle() {
  return {_typeName: TYPE_NAME};
}
