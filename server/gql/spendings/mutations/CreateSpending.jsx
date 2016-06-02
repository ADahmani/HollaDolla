import ViewerType, {resolveSingle} from '../../viewer/ViewerType';
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
    from: {
      type: GraphQLString,
    },
    to: {
      type: GraphQLString,
    },
    amount: {
      type: GraphQLString,
    },
    projet: {
      type: GraphQLString,
    },
  },

  outputFields: {
    viewer: {
      type: ViewerType,
      resolve: resolveSingle,
    },
    spendingEdge: {
      type: SpendingEdgeType,
      resolve: node => ({
        node,
        cursor: dateToCursor(node.created)
      })
    }
  },

  mutateAndGetPayload: (data, info) => {
    const me = info.rootValue.authedUser;
    console.log('daaaataa', data);
    return createSpending(me, data).then((spending) => {
      return spending;
    });
  }
});
