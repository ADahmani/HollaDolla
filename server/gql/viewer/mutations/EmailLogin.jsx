import ViewerType, {resolveSingle} from '../ViewerType';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import emailLogin from '../../..//models/user/actions/emailLogin';
import {assign} from 'lodash';

import {
  GraphQLString,
} from 'graphql';

export default mutationWithClientMutationId({
  name: 'EmailLogin',

  inputFields: {
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    }
  },

  outputFields: {
    viewer: {
      type: ViewerType,
      resolve: resolveSingle,
    },
  },

  mutateAndGetPayload: ({email, password}, info) =>
    emailLogin(email, password, info.rootValue)
    .then(authedUser =>
      authedUser && assign(info.rootValue, {authedUser})
    )

});
