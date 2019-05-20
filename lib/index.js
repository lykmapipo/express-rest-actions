'use strict';

const lodash = require('lodash');
const isStream = require('is-stream');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');

/**
 * @function getFor
 * @name getFor
 * @description Create http get handler for given service options
 * @param {Object} optns valid getFor options
 * @param {Function} optns.get valid service function to invoke when get
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
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
  const { get: doGet, filterParams = true } = options;

  // create http handler to get resources
  const httpGet = (request, response, next) => {
    // ensure service get
    if (!lodash.isFunction(doGet)) {
      return response.methodNotAllowed();
    }

    // obtain params and mquery from request
    const { params = {}, mquery = {} } = request;

    // extend filter with params
    if (filterParams) {
      mquery.filter = common.mergeObjects(params, mquery.filter);
    }

    // obtain get options
    const query = common.mergeObjects(mquery);

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
    return doGet(query, afterHttpGet);
  };

  // return http get handler
  return httpGet;
};

/**
 * @function schemaFor
 * @name schemaFor
 * @description Create http get handler for schema of a given service options
 * @param {Object} optns valid schemaFor options
 * @param {Function} optns.getSchema valid service function to invoke when get
 * schema
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
 * @return {Function} valid express middleware to handle get schema request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { app, schemaFor } = require('@lykmapipo/express-rest-actions');
 *
 * const getSchema = (query, done) => done(null, { ... });
 * app.get('/v1/users', schemaFor({ getSchema }));
 *
 */
const schemaFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { getSchema: doGetSchema, filterParams = true } = options;

  // create http handler to get resource schema
  const httpGetSchema = (request, response, next) => {
    // ensure service getSchema
    if (!lodash.isFunction(doGetSchema)) {
      return response.methodNotAllowed();
    }

    // obtain params and mquery from request
    const { params = {}, mquery = {} } = request;

    // extend filter with params
    if (filterParams) {
      mquery.filter = common.mergeObjects(params, mquery.filter);
    }

    // obtain get options
    const query = common.mergeObjects(mquery);

    // handle request
    const afterHttpGetSchema = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service getSchema
    return doGetSchema(query, afterHttpGetSchema);
  };

  // return http getSchema handler
  return httpGetSchema;
};

/**
 * @function downloadFor
 * @name downloadFor
 * @description Create http get handler for downloading of a given
 * service options
 * @param {Object} optns valid downloadFor options
 * @param {Function} optns.download valid service to to invoke when
 * downloading. It must return `readStream` which is `stream.Readable` and
 * `fileName` which is `String`.
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
 * @return {Function} valid express middleware to handle downloading request
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const { createReadStream } = require('fs');
 * const { app, downloadFor } = require('@lykmapipo/express-rest-actions');
 *
 * const download = (query, done) => {
 *    const fileName = 'avatar.png';
 *    const readStream = createReadStream('./avatar.png');
 *    return done(null, { fileName, readStream });
 * };
 *
 * app.get('/v1/files/avatar', downloadFor({ download }));
 *
 */
const downloadFor = optns => {
  // ensure options
  const options = common.mergeObjects(optns);
  const { download: doDownload, status = 200, filterParams = true } = options;

  // create http handler to download
  const httpDownload = (request, response, next) => {
    // ensure service download and fileName provider
    if (!lodash.isFunction(doDownload)) {
      return response.methodNotAllowed();
    }
    // obtain params and mquery from request
    const { params = {}, mquery = {} } = request;

    // extend filter with params
    if (filterParams) {
      mquery.filter = common.mergeObjects(params, mquery.filter);
    }

    // obtain get options
    const query = common.mergeObjects(mquery);

    // handle request
    const afterHttpDownload = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }

      // obtain download file name and stream
      const { fileName, readStream } = results;

      // ensure read stream
      if (!isStream.readable(readStream)) {
        return response.methodNotAllowed();
      }

      // handle success downloading
      response.attachment(fileName);
      response.status(status);
      return readStream.pipe(response);
    };

    // invoke service download
    return doDownload(query, afterHttpDownload);
  };

  // return http download handler
  return httpDownload;
};

/**
 * @function getByIdFor
 * @name getByIdFor
 * @description Create http getById handler for given service options
 * @param {Object} optns valid getByIdFor options
 * @param {Function} optns.getById valid service function to invoke when getById
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
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
  const { getById: doGetById, filterParams = true } = options;

  // create http handler to get single resource
  const httpGetById = (request, response, next) => {
    // ensure service getById
    if (!lodash.isFunction(doGetById)) {
      return response.methodNotAllowed();
    }

    // obtain params and mquery from request
    const { params = {}, mquery = {} } = request;
    const { id, ...extraParams } = params;

    // extend filter with params
    if (filterParams) {
      mquery.filter = common.mergeObjects(extraParams, mquery.filter);
    }

    // obtain mquery options and id path param
    const query = common.mergeObjects(mquery, { _id: id, id });

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
    return doGetById(query, afterHttpGetById);
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
 * @param {Boolean} [optns.bodyParams=true] whether to merge params into
 * body
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
  const { post: doPost, bodyParams = true } = options;

  // create http handler to create single resource
  const httpPost = (request, response, next) => {
    // ensure service post
    if (!lodash.isFunction(doPost)) {
      return response.methodNotAllowed();
    }

    // obtain params and body from request
    const { params = {}, body = {} } = request;

    // prepare request body
    let query = common.mergeObjects(body);

    // extend body with params
    if (bodyParams) {
      query = common.mergeObjects(params, body);
    }

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
    return doPost(query, afterHttpPost);
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
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
 * @param {Boolean} [optns.bodyParams=true] whether to merge params into
 * body
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
  const { patch: doPatch, filterParams = true, bodyParams = true } = options;

  // create http handler to patch single resource
  const httpPatch = (request, response, next) => {
    // ensure service patch
    if (!lodash.isFunction(doPatch)) {
      return response.methodNotAllowed();
    }

    // obtain params and body from request
    const { params = {}, body = {} } = request;
    const { id, ...extraParams } = params;

    // prepare request body
    let query = common.mergeObjects(body);

    // extend body with params
    if (bodyParams) {
      query = common.mergeObjects(extraParams, body);
    }

    // extend filter with params
    if (filterParams) {
      query.filter = common.mergeObjects(extraParams);
    }

    // pack request body and id path param
    query = common.mergeObjects(query, { _id: id, id });

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
    return doPatch(query, afterHttpPatch);
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
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
 * @param {Boolean} [optns.bodyParams=true] whether to merge params into
 * body
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
  const { put: doPut, filterParams = true, bodyParams = true } = options;

  // create http handler to put single resource
  const httpPut = (request, response, next) => {
    // ensure service put
    if (!lodash.isFunction(doPut)) {
      return response.methodNotAllowed();
    }

    // obtain params and body from request
    const { params = {}, body = {} } = request;
    const { id, ...extraParams } = params;

    // prepare request body
    let query = common.mergeObjects(body);

    // extend body with params
    if (bodyParams) {
      query = common.mergeObjects(extraParams, body);
    }

    // extend filter with params
    if (filterParams) {
      query.filter = common.mergeObjects(extraParams);
    }

    // pack request body and id path param
    query = common.mergeObjects(query, { _id: id, id });

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
    return doPut(query, afterHttpPut);
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
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
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
  const { del: doDelete, soft = false, filterParams = true } = options;

  // create http handler to delete single resource
  const httpDelete = (request, response, next) => {
    // ensure service delete
    if (!lodash.isFunction(doDelete)) {
      return response.methodNotAllowed();
    }

    // obtain params and mquery from request
    const { params = {} } = request;
    const { id, ...extraParams } = params;

    // prepare delete options
    const query = common.mergeObjects({ _id: id, id, soft });

    // extend filter with params
    if (filterParams) {
      query.filter = common.mergeObjects(extraParams);
    }

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
    return doDelete(query, afterHttpDelete);
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
 * @param {Function} [optns.getSchema] valid service function to invoke when
 * get schema
 * @param {Function} [optns.export] valid service function to invoke when get
 * exports. It must return `readStream` which is `stream.Readable` and
 * `fileName` which is `String`.
 * @param {Function} optns.getById valid service function to invoke when getById
 * @param {Function} optns.post valid service function to invoke when post
 * @param {Function} optns.patch valid service function to invoke when patch
 * @param {Function} optns.put valid service function to invoke when put
 * @param {Function} optns.del valid service function to invoke when delete
 * @param {Boolean} [optns.soft=false] whether to invoke soft router
 * @param {String} [optns.version='1.0.0'] valid api version to append on path
 * @param {Boolean} [optns.filterParams=true] whether to merge params into
 * filter
 * @param {Boolean} [optns.bodyParams=true] whether to merge params into
 * body
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

  // normalize download and export handler
  options.download = options.download || options.export;

  // create paths
  const { pathSingle = `/${options.resource}/:id` } = options;
  const { pathList = `/${options.resource}` } = options;
  const { pathSchema = `/${options.resource}/schema` } = options;
  const { pathExport = `/${options.resource}/export` } = options;

  // create versioned router
  const router = new expressCommon.Router(options);

  // bind http action handlers
  router.get(pathList, getFor(options));
  router.get(pathSchema, schemaFor(options));
  router.get(pathExport, downloadFor(options));
  router.get(pathSingle, getByIdFor(options));
  router.post(pathList, postFor(options));
  router.patch(pathSingle, patchFor(options));
  router.put(pathSingle, putFor(options));
  router.delete(pathSingle, deleteFor(options));

  // return http resource router
  return router;
};

Object.defineProperty(exports, 'Router', {
  enumerable: true,
  get: function () {
    return expressCommon.Router;
  }
});
Object.defineProperty(exports, 'all', {
  enumerable: true,
  get: function () {
    return expressCommon.all;
  }
});
Object.defineProperty(exports, 'app', {
  enumerable: true,
  get: function () {
    return expressCommon.app;
  }
});
Object.defineProperty(exports, 'del', {
  enumerable: true,
  get: function () {
    return expressCommon.del;
  }
});
Object.defineProperty(exports, 'get', {
  enumerable: true,
  get: function () {
    return expressCommon.get;
  }
});
Object.defineProperty(exports, 'patch', {
  enumerable: true,
  get: function () {
    return expressCommon.patch;
  }
});
Object.defineProperty(exports, 'post', {
  enumerable: true,
  get: function () {
    return expressCommon.post;
  }
});
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function () {
    return expressCommon.put;
  }
});
Object.defineProperty(exports, 'use', {
  enumerable: true,
  get: function () {
    return expressCommon.use;
  }
});
exports.deleteFor = deleteFor;
exports.downloadFor = downloadFor;
exports.getByIdFor = getByIdFor;
exports.getFor = getFor;
exports.patchFor = patchFor;
exports.postFor = postFor;
exports.putFor = putFor;
exports.routerFor = routerFor;
exports.schemaFor = schemaFor;
