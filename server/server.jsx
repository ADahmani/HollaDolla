import express from 'express';
import graphqlHTTP from 'express-graphql';
import RootSchema from './gql/RootSchema';
require('./scripts/updateSchema');
import models from './models';

models.initialize();
let app  = express();
let PORT = 3333;
app.use('/graphql', graphqlHTTP({ schema: RootSchema, graphiql: true }));

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});
