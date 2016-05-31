import Interface from '../NodeInterface';
var {nodeInterface, globalIdField} = Interface;
import UserType, {resolveSingle as resolveUser} from '../user/UserType';
import loginEmail from '../../models/user/actions/emailLogin'

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

const TYPE_NAME = 'Viewer';

export default new GraphQLObjectType({
  name: TYPE_NAME,
  description: 'Entry point',
  fields: () => ({
    id: globalIdField(TYPE_NAME, () => 0),
    me: {
      type: UserType,
      description: 'Logged in user',
      resolve: (parent, args, info) => {
        const authedUser = info.rootValue.authedUser;
        if (!authedUser) return null;
        console.log('authedUserauthedUserauthedUserauthedUserauthedUser');
        console.log(authedUser);
        return resolveUser(authedUser._id.toString(), info);
      },
    },
  }),
  interfaces: [nodeInterface],
});

export function resolveSingle() {
  return {_typeName: TYPE_NAME};
}
