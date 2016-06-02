import {mutationWithClientMutationId, fromGlobalId} from 'graphql-relay';
import addFriend from '../../../models/user/actions/addFriend';
import {assign} from 'lodash';
import UserType, {resolveSingle as resolveUser} from '../UserType';

import {
  GraphQLString,
} from 'graphql';

export default mutationWithClientMutationId({
  name: 'AddFriend',

  inputFields: {
    email: {
      type: GraphQLString,
    }
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: ({_id}, info) => resolveUser(_id, info)
    },
  },

  mutateAndGetPayload: ({email}, info) => {
    const me = info.rootValue.authedUser;
    return addFriend(me, email)
    .then(() => {
      return {_id: me._id};
    });
  }

});
