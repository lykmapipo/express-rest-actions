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
  const index = (request, response, next) => {
    // ensure service get
    if (!isFunction(get)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options
    const query = mergeObjects(request.mquery);

    // handle request
    const afterIndex = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service get
    return get(query, afterIndex);
  };

  // return get handler
  return index;
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
  const show = (request, response, next) => {
    // ensure service getById
    if (!isFunction(getById)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options and id path params
    const { id } = request.params || {};
    const query = mergeObjects(request.mquery, { _id: id, id });

    // handle request
    const afterShow = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service getById
    return getById(query, afterShow);
  };

  // return get handler
  return show;
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

  // create http handler to create resource
  const create = (request, response, next) => {
    // ensure service post
    if (!isFunction(post)) {
      return response.methodNotAllowed();
    }

    // obtain request body
    const query = mergeObjects(request.body);

    // handle request
    const afterCreate = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.created(results);
    };

    // invoke service post
    return post(query, afterCreate);
  };

  // return get handler
  return create;
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
  const update = (request, response, next) => {
    // ensure service patch
    if (!isFunction(patch)) {
      return response.methodNotAllowed();
    }

    // obtain request body and id path params
    const { id } = request.params || {};
    const query = mergeObjects(request.body, { _id: id, id });

    // handle request
    const afterUpdate = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service patch
    return patch(query, afterUpdate);
  };

  // return get handler
  return update;
};

export { app, Router };
