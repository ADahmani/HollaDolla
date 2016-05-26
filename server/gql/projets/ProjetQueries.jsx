import ProjetType, {resolveSingle} from './ProjetType';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export default {
  projet: {
    type: ProjetType,
    description: 'Gets a single projet',
    args: {
      id: {
        name: 'projetId',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, {id}, info) =>
      resolveSingle(id, info)
  }
};
