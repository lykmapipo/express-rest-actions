'use strict';

const lodash = require('lodash');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');

/**
 * @function getFor
 * @name getFor
 * @description Create http get handler for given service options
 * @param {Object} optns valid getFor options
 * @param {Function} optns.get valid service function to invoke when get
 * @return {Function} valid express middleware to handle get request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, getFor } = require('@lykmapipo/express-rest-actions');
 *
 * const get = (query, done) => done(null, { data:[ ... ] });
 * app.get('/v1/users', getFor({ get }));
 *
 */
const getFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { get } = options;

  // create http handler to get resources
  const httpGet = (request, response, next) => {
    // ensure service get
    if (!lodash.isFunction(get)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options
    const query = common.mergeObjects(request.mquery);

    // handle request
    const afterHttpGet = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service get
    return get(query, afterHttpGet);
  };

  // return http get handler
  return httpGet;
};

/**
 * @function getByIdFor
 * @name getByIdFor
 * @description Create http getById handler for given service options
 * @param {Object} optns valid getByIdFor options
 * @param {Function} optns.getById valid service function to invoke when getById
 * @return {Function} valid express middleware to handle get by id request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, getByIdFor } = require('@lykmapipo/express-rest-actions');
 *
 * const getById = (query, done) => done(null, { ... });
 * app.get('/v1/users/:id', getByIdFor({ getById }));
 *
 */
const getByIdFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { getById } = options;

  // create http handler to get single resource
  const httpGetById = (request, response, next) => {
    // ensure service getById
    if (!lodash.isFunction(getById)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options and id path param
    const { id } = request.params || {};
    const query = common.mergeObjects(request.mquery, { _id: id, id });

    // handle request
    const afterHttpGetById = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service getById
    return getById(query, afterHttpGetById);
  };

  // return htt get by id handler
  return httpGetById;
};

/**
 * @function postFor
 * @name postFor
 * @description Create http post handler for given service options
 * @param {Object} optns valid postFor options
 * @param {Function} optns.post valid service function to invoke when post
 * @return {Function} valid express middleware to handle post request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, postFor } = require('@lykmapipo/express-rest-actions');
 *
 * const post = (body, done) => done(null, { ... });
 * app.post('/v1/users', postFor({ post }));
 *
 */
const postFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { post } = options;

  // create http handler to create single resource
  const httpPost = (request, response, next) => {
    // ensure service post
    if (!lodash.isFunction(post)) {
      return response.methodNotAllowed();
    }

    // obtain request body
    const query = common.mergeObjects(request.body);

    // handle request
    const afterHttpPost = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.created(results);
    };

    // invoke service post
    return post(query, afterHttpPost);
  };

  // return http post handler
  return httpPost;
};

/**
 * @function patchFor
 * @name patchFor
 * @description Create http patch handler for given service options
 * @param {Object} optns valid patchFor options
 * @param {Function} optns.patch valid service function to invoke when patch
 * @return {Function} valid express middleware to handle patch request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, patchFor } = require('@lykmapipo/express-rest-actions');
 *
 * const patch = (query, done) => done(null, { ... });
 * app.patch('/v1/users/:id', patchFor({ patch }));
 *
 */
const patchFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { patch } = options;

  // create http handler to patch single resource
  const httpPatch = (request, response, next) => {
    // ensure service patch
    if (!lodash.isFunction(patch)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path param
    const { id } = request.params || {};
    const query = common.mergeObjects(request.body, { _id: id, id });

    // handle request
    const afterHttpPatch = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service patch
    return patch(query, afterHttpPatch);
  };

  // return http patch handler
  return httpPatch;
};

/**
 * @function putFor
 * @name putFor
 * @description Create http put handler for given service options
 * @param {Object} optns valid putFor options
 * @param {Function} optns.put valid service function to invoke when put
 * @return {Function} valid express middleware to handle put request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, putFor } = require('@lykmapipo/express-rest-actions');
 *
 * const put = (query, done) => done(null, { ... });
 * app.put('/v1/users/:id', putFor({ put }));
 *
 */
const putFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { put } = options;

  // create http handler to put single resource
  const httpPut = (request, response, next) => {
    // ensure service put
    if (!lodash.isFunction(put)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path param
    const { id } = request.params || {};
    const query = common.mergeObjects(request.body, { _id: id, id });

    // handle request
    const afterHttpPut = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service put
    return put(query, afterHttpPut);
  };

  // return http put handler
  return httpPut;
};

/**
 * @function deleteFor
 * @name deleteFor
 * @description Create http delete handler for given service options
 * @param {Object} optns valid deleteFor options
 * @param {Function} optns.del valid service function to invoke when delete
 * @param {Boolean} [optns.soft=false] whether to invoke soft delete
 * @return {Function} valid express middleware to handle delete request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, deleteFor } = require('@lykmapipo/express-rest-actions');
 *
 * const del = (query, done) => done(null, { ... });
 * app.delete('/v1/users/:id', deleteFor({ del }));
 *
 */
const deleteFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { del, soft = false } = options;

  // create http handler to delete single resource
  const httpDelete = (request, response, next) => {
    // ensure service delete
    if (!lodash.isFunction(del)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path param
    const { id } = request.params || {};
    const query = common.mergeObjects({ _id: id, id, soft });

    // handle request
    const afterHttpDelete = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service delete
    return del(query, afterHttpDelete);
  };

  // return http put handler
  return httpDelete;
};

/**
 * @function routerFor
 * @name routerFor
 * @description Create http resource router for given service options
 * @param {Object} optns valid routerFor options
 * @param {String} optns.resource valid resource name to be used as http path
 * @param {Function} optns.get valid service function to invoke when get
 * @param {Function} optns.getById valid service function to invoke when getById
 * @param {Function} optns.post valid service function to invoke when post
 * @param {Function} optns.patch valid service function to invoke when patch
 * @param {Function} optns.put valid service function to invoke when put
 * @param {Function} optns.del valid service function to invoke when delete
 * @param {Boolean} [optns.soft=false] whether to invoke soft router
 * @param {String} [optns.version='1.0.0'] valid api version to append on path
 * @return {Function} valid express middleware to handle router request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, routerFor } = require('@lykmapipo/express-rest-actions');
 *
 * const options = { get: ..., post: ..., del: ... };
 * app.use(routerFor(options));
 *
 */
const routerFor = optns => {
  // ensure options
  const defaults = { version: env.getString('API_VERSION', '1.0.0'), soft: false };
  const options = common.mergeObjects(defaults, optns);

  // create paths
  const PATH_SINGLE = `/${options.resource}/:id`;
  const PATH_LIST = `/${options.resource}`;

  // create versioned router
  const router = new expressCommon.Router(options);

  // bind http action handlers
  router.get(PATH_LIST, getFor(options));
  router.get(PATH_SINGLE, getByIdFor(options));
  router.post(PATH_LIST, postFor(options));
  router.patch(PATH_SINGLE, patchFor(options));
  router.put(PATH_SINGLE, putFor(options));
  router.delete(PATH_SINGLE, deleteFor(options));

  // return http resource router
  return router;
};

Object.defineProperty(exports, 'Router', {
  enumerable: true,
  get: function () {
    return expressCommon.Router;
  }
});
Object.defineProperty(exports, 'app', {
  enumerable: true,
  get: function () {
    return expressCommon.app;
  }
});
exports.deleteFor = deleteFor;
exports.getByIdFor = getByIdFor;
exports.getFor = getFor;
exports.patchFor = patchFor;
exports.postFor = postFor;
exports.putFor = putFor;
exports.routerFor = routerFor;
