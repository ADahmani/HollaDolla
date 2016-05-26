import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';


const defs = nodeDefinitions(

  (globalId, info) => {
    const {type, id} = fromGlobalId(globalId);

    const resolver = require('./Types').getResolver(type);

    if (!resolver) throw `(error) resolver not found for type: ${type}`;

    return resolver(id, info);
  },

  (obj) => {
    return require('./Types').getTypeFromInstanceObject(obj);
  }

);

var Interface = {
  nodeInterface: defs.nodeInterface,
  nodeField: defs.nodeField,
  fromGlobalId: fromGlobalId,
  globalIdField: globalIdField
};

export default Interface;
