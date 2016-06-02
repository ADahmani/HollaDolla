const types = [
  require('./viewer/ViewerType'),
  require('./user/UserType'),
  require('./projets/ProjetType'),
  require('./spendings/SpendingType'),
  require('./spendings/SpenderType')
];

var instanceMap = {};
var resolvers = {};

types.forEach(TypeModule => {
  const Type = TypeModule.default;
  if (!Type) throw `No type defined in ${typePath}. Export it as default`;
  if (!Type.toString()) throw `No name for type defined in ${typePath}`;
  if (!TypeModule.resolveSingle) throw `resolveSingle not defined for ${Type.name}`;

  resolvers[Type.toString()] = TypeModule.resolveSingle;
  instanceMap[Type.toString()] = Type;
});

export function getResolver(name) {
  return resolvers[name];
}

export function getTypeFromInstanceObject(obj) {

  if (!obj._typeName) {
    throw 'resolved object did not have _typeName. Cannot identify';
  }

  return instanceMap[obj._typeName];
};
