import ProjetType, {resolveSingle} from '../../projets/ProjetType';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import createSpending from '../../../models/spending/actions/createSpending';
import {edgeType as SpendingEdgeType} from '../SpendingConnection';
import {dateToCursor} from '../../Util';

import {
  GraphQLString,
  GraphQLList,
} from 'graphql';

export default mutationWithClientMutationId({
  name: 'CreateSpending',

  inputFields: {
    to: {
      type: new GraphQLList(GraphQLString),
    },
    amount: {
      type: GraphQLString,
    },
    projet: {
      type: GraphQLString,
    },
  },

  outputFields: {
    projet: {
      type: ProjetType,
      resolve: projet => resolveSingle(projet),
    }
  },

  mutateAndGetPayload: (data, info) => {
    const me = info.rootValue.authedUser;
    data.from = me._id;
    createSpending(me, data);
    return {_id: data.projet};
  }
});
