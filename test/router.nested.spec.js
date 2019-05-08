import { clear, testRouter, faker } from '@lykmapipo/express-test-helpers';
import { routerFor } from '../src/index';

describe('routerFor - nested resources', () => {
  beforeEach(() => clear());

  const paths = {
    pathSingle: '/users/:user/comments/:id',
    pathList: '/users/:user/comments',
  };
  const options = {
    version: '1.0.0',
    ...paths,
    get: (query, cb) => cb(null, { data: [] }),
    getById: (query, cb) => cb(null, {}),
    post: (body, cb) => cb(null, body),
    patch: (query, cb) => cb(null, {}),
    put: (query, cb) => cb(null, {}),
    del: (query, cb) => cb(null, {}),
  };
  const router = routerFor(options);

  it('should handle http GET /resource/:id/resource', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1 }).expect(200, done);
  });

  it('should handle http GET /resource/:id/resource/:id', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1, id: 1 }).expect(200, done);
  });

  it('should handle http POST /resource/:id/resource', done => {
    const { testPost } = testRouter(paths, router);
    testPost({ user: 1, name: faker.name.findName() }).expect(201, done);
  });

  it('should handle http PATCH /resource/:id/resource/:id', done => {
    const { testPatch } = testRouter(paths, router);
    testPatch({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http PUT /resource/:id/resource/:id', done => {
    const { testPut } = testRouter(paths, router);
    testPut({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should handle http DELETE /resource/:id/resource/:id', done => {
    const { testDelete } = testRouter(paths, router);
    testDelete({ user: 1, id: 1 }).expect(200, done);
  });
});