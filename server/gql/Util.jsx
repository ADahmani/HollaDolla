import P from 'bluebird';
import _ from 'lodash';
import mongoose from 'mongoose';

export function getProjection(fieldASTs) {
  return {};
}

export function base64(i) {
  return ((new Buffer(i, 'ascii')).toString('base64'));
}

export function unbase64(i) {
  return ((new Buffer(i, 'base64')).toString('ascii'));
}

export function offsetPaginator(model, constraints, sort, rangeArgs, info) {
  var {first, after, skip} = rangeArgs;

  var startOffset = after ? getStartOffset(after) : (skip || 0);

  var queryLength = first + 1;

  var query = mongoose.model(model).find(constraints);

  if (sort) {
    query = query.sort(sort);
  }

  query = query
    .skip(startOffset)
    .limit(queryLength)
    .lean().exec();

  var totalCount;

  var getTotalCount = () => {
    if (!totalCount) {
      totalCount = mongoose.model(model).count(constraints).exec();
    }

    return totalCount;
  };

  var getNumPages = () => {
    return getTotalCount().then(
      total => Math.ceil((total / (queryLength - 1)))
    );
  };

  return P.resolve(query)

  .then(results => {
    if (results.length === 0 || first === 0) return emptyConnection();

    var edges = _(results)
      .take(first)
      .map((node, index) => ({
        node,
        cursor: makeCursor(startOffset, index)
      }))
      .value();

    return {
      edges,
      getTotalCount,
      getNumPages,
      pageInfo: {
        startCursor: edges[0].cursor,
        endCursor: edges[edges.length - 1].cursor,
        hasPreviousPage: startOffset > 0,
        hasNextPage: results.length === queryLength,
      }
    };
  });
}

export function emptyConnection() {
  return {
    edges: [],
    pageInfo: {
      startCursor: null,
      endCursor: null,
      hasPreviousPage: false,
      hasNextPage: false
    },
    getTotalCount: () => 0,
    getNumPages: () => 0,
    rangeBegin: 0,
    rangeEnd: 0,
  };
}

export function makeCursor(startOffset, index) {
  return offsetToCursor(startOffset + index);
}

export function getStartOffset(after) {
  return cursorToOffset(after) + 1;
}

var PREFIX = 'OFFSET';

function offsetToCursor(offset) {
  return base64(PREFIX + offset);
}

function cursorToOffset(cursor) {
  return parseInt(unbase64(cursor).substring(PREFIX.length), 10);
}

var DATE_PREFIX = 'DATE';

export function dateToCursor(date) {
  return base64(DATE_PREFIX + date.toISOString());
}

export function cursorToDate(cursor) {
  return new Date(unbase64(cursor).substring(DATE_PREFIX.length));
}
