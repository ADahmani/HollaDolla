import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import graphqlHTTP from 'express-graphql';
import RootSchema from './gql/RootSchema';
require('./scripts/updateSchema');
import models from './models';

models.initialize();
let app  = express();
let PORT = 3333;
var User = mongoose.model('User');



app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'achrafdahmani'}));

// app.use(express.errorHandler({showStack: true, dumpExceptions: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id: id})
    .exec(function(err, user) {
      done(err, user);
    }
  );
});

app.use('/graphql',graphqlHTTP((req) => ({
  schema: RootSchema,
  graphiql: true,
  rootValue: {
    authedUser: req.user,
    req
  }
})));

let server = app.listen(PORT, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://%s:%s', host, port);
});
