import ViewerType, {resolveSingle} from '../../viewer/ViewerType';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import createProjet from '../../../models/projet/actions/createProjet';

import {
  GraphQLString,
  GraphQLList,
} from 'graphql';

export default mutationWithClientMutationId({
  name: 'CreateProjet',

  inputFields: {
    name: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    participants: {
      type: new GraphQLList(GraphQLString),
    },
  },

  outputFields: {
    viewer: {
      type: ViewerType,
      resolve: resolveSingle,
    },
  },

  mutateAndGetPayload: (data, info) => {
    const me = info.rootValue.authedUser;
    console.log('daaaataa', data);
    return createProjet(me, data)
    .then(() => {
      return {};
    });
  }

});
