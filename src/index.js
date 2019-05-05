import { isFunction } from 'lodash';
import { mergeObjects } from '@lykmapipo/common';
import { app, Router } from '@lykmapipo/express-common';

/**
 * @function getFor
 * @name getFor
 * @description Create http get handle for given options
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

  // create http handlers
  const getAll = (request, response, next) => {
    // ensure service get
    if (!isFunction(get)) {
      return response.methodNotAllowed();
    }

    // obtain mquery options
    const query = mergeObjects(request.mquery);

    // handle request
    const afterGetAll = (error, results) => {
      // handle error
      if (error) {
        return next(error);
      }
      // handle success
      return response.ok(results);
    };

    // invoke service get
    return get(query, afterGetAll);
  };

  // return get handler
  return getAll;
};

export { app, Router };
