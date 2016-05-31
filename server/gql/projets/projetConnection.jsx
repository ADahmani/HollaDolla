import {offsetPaginator} from '../Util';
import createConnection from '../createConnection';
import {connectionArgs} from 'graphql-relay';
import ProjetType from './ProjetType';
import {
  GraphQLInt,
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';

function resolveProjetsConnection(parent, args, info) {
  var query = {};
  // filtring
  console.log("///////////");
  var authedUser = info.rootValue.authedUser;
  console.log(authedUser);
  query.participants = authedUser._id.toString();;
  console.log("///////////");


  console.log('query', query);
  args.filter = args.filter || {};

  const filter = args.filter || {};

  var {
    state
  } = filter;

  if (state) {
    query.state = state;
  }

  var sortQuery = {created: 1};

  return offsetPaginator('Projet', query, sortQuery, args, info);
}

// var FilterInput = new GraphQLInputObjectType({
//   name: 'ProjetConnectionInput',
//   fields: {
//     state: {type: GraphQLString}
//   },
// });


const Connection = createConnection('Projets', ProjetType);

// var backwardConnectionArgs = {
//   before: {
//     type: GraphQLString
//   },
//   last: {
//     type: GraphQLInt
//   }
// };
//
// var forwardConnectionArgs = {
//   after: {
//     type: GraphQLString
//   },
//   first: {
//     type: GraphQLInt
//   }
// };

export default {
  type: Connection.connectionType,
  description: 'Generic Projets Connection',
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
    // filter: {
    //   type: FilterInput
    // },
  },
  resolve: (parent, args, info) =>
    resolveProjetsConnection(parent, args, info),
};
