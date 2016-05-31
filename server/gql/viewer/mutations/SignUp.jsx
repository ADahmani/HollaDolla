import ViewerType, {resolveSingle} from '../ViewerType';
import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import signUp from '../../../models/user/actions/signUp';
import {assign} from 'lodash';

import {
  GraphQLString,
} from 'graphql';

export default mutationWithClientMutationId({
  name: 'SignUp',

  inputFields: {
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
    userName: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },

  outputFields: {
    viewer: {
      type: ViewerType,
      resolve: resolveSingle,
    },
  },

  mutateAndGetPayload: (data, info) =>
    signUp(data, info.rootValue)
    .then(authedUser =>
      authedUser && assign(info.rootValue, {authedUser})
    )

});
