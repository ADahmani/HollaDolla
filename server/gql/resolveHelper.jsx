import mongoose from 'mongoose';
import _ from 'lodash';
import {getProjection} from './Util';

//promisify
mongoose.Promise = require('bluebird');

export function resolveMultiByQuery(mongoCollection, name, query, info) {
   return mongoose
      .model(mongoCollection)
      .find(query)
      .lean()
      .exec()
      .then(models => _.map(models, (model) => {
          return Object.assign({_typeName: name}, model);
      }));
};

export function resolveSingleByQuery(mongoCollection, name, query, info, notNull) {
  return mongoose
      .model(mongoCollection)
      .findOne(query, getProjection(info.fieldASTs))
      .lean()
      .exec()
      .tap(model => {if (!model && notNull) throw 'not_found';})
      .then(model => Object.assign({_typeName: name}, model));
};

export function resolveSingleById(mongoCollection, name, _id, info, notNull) {
  return resolveSingleByQuery(mongoCollection, name, {_id}, info, notNull);
};
