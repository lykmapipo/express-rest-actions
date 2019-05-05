import { isFunction } from 'lodash';
import { mergeObjects } from '@lykmapipo/common';
import { app, Router } from '@lykmapipo/express-common';

/**
 * @function getFor
 * @name getFor
 * @description Create http get handler for given service options
 * @param {Object} optns valid getFor options
 * @param {Function} optns.get valid service function to invoke when get
 * @return {Function} valid express middleware to handle request
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
export const getFor = optns => {
  // ensure options
  const options = mergeObjects(optns);
  const { get } = options;

  // create http handler to get resources
  const httpGet = (request, response, next) => {
    // ensure service get
    if (!isFunction(get)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options
    const query = mergeObjects(request.mquery);

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
 * @return {Function} valid express middleware to handle request
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
export const getByIdFor = optns => {
  // ensure options
  const options = mergeObjects(optns);
  const { getById } = options;

  // create http handler to get single resource
  const httpGetById = (request, response, next) => {
    // ensure service getById
    if (!isFunction(getById)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options and id path param
    const { id } = request.params || {};
    const query = mergeObjects(request.mquery, { _id: id, id });

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
 * @return {Function} valid express middleware to handle request
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
export const postFor = optns => {
  // ensure options
  const options = mergeObjects(optns);
  const { post } = options;

  // create http handler to create single resource
  const httpPost = (request, response, next) => {
    // ensure service post
    if (!isFunction(post)) {
      return response.methodNotAllowed();
    }

    // obtain request body
    const query = mergeObjects(request.body);

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
 * @return {Function} valid express middleware to handle request
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
export const patchFor = optns => {
  // ensure options
  const options = mergeObjects(optns);
  const { patch } = options;

  // create http handler to patch single resource
  const httpPatch = (request, response, next) => {
    // ensure service patch
    if (!isFunction(patch)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path param
    const { id } = request.params || {};
    const query = mergeObjects(request.body, { _id: id, id });

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
 * @return {Function} valid express middleware to handle request
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
export const putFor = optns => {
  // ensure options
  const options = mergeObjects(optns);
  const { put } = options;

  // create http handler to put single resource
  const httpPut = (request, response, next) => {
    // ensure service put
    if (!isFunction(put)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path param
    const { id } = request.params || {};
    const query = mergeObjects(request.body, { _id: id, id });

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

export { app, Router };
