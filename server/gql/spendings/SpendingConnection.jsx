import {offsetPaginator} from '../Util';
import createConnection from '../createConnection';
import {connectionArgs} from 'graphql-relay';
import SpendingType from './SpendingType';
import {
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

function resolveSpendingsConnection(parent, args, info) {
  var query = {};
  // le parent de cette node est le projet
  query.projet = parent._id;

  var sortQuery = {created: -1};

  return offsetPaginator('Spending', query, sortQuery, args, info);
}

const Connection = createConnection('Spendings', SpendingType);

export default {
  type: Connection.connectionType,
  description: 'Generic Spendings Connection',
  args: {
    before: {
      type: GraphQLString
    },
    last: {
      type: GraphQLInt
    },
    after: {
      type: GraphQLString
    },
    first: {
      type: GraphQLInt
    },
    skip: {type: GraphQLInt},
  },
  resolve: (parent, args, info) =>
    resolveSpendingsConnection(parent, args, info),
};

export var edgeType = Connection.edgeType;
