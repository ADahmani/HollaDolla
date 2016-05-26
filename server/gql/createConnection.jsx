import {connectionDefinitions} from 'graphql-relay';
import {GraphQLInt} from 'graphql';

export default function createConnection(name, nodeType) {
  return connectionDefinitions({
    name,
    nodeType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: conn => conn.getTotalCount()
      },
      numPages: {
        type: GraphQLInt,
        resolve: conn => conn.getNumPages()
      },
      rangeBegin: {
        type: GraphQLInt
      },
      rangeEnd: {
        type: GraphQLInt
      }
    })
  });
}

export function createUnpaginatedConnection(name, nodeType) {
  return connectionDefinitions({name, nodeType});
}
