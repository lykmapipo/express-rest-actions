import { clear, testRouter, faker } from '@lykmapipo/express-test-helpers';
import { routerFor } from '../src/index';

describe('routerFor', () => {
  beforeEach(() => clear());

  const options = {
    version: '1.0.0',
    resource: 'users',
    get: (query, cb) => cb(null, { data: [] }),
    getSchema: (query, cb) => cb(null, {}),
    getById: (query, cb) => cb(null, {}),
    post: (body, cb) => cb(null, body),
    patch: (query, cb) => cb(null, {}),
    put: (query, cb) => cb(null, {}),
    del: (query, cb) => cb(null, {}),
  };
  const router = routerFor(options);

  it('should handle http GET /resource', done => {
    const { testGet } = testRouter('users', router);
    testGet().expect(200, done);
  });

  it('should handle http GET /resource/schema', done => {
    const { testGetSchema } = testRouter('users', router);
    testGetSchema().expect(200, done);
  });

  it('should handle http GET /resource/:id', done => {
    const { testGet } = testRouter('users', router);
    testGet(1).expect(200, done);
  });

  it('should handle http POST /resource', done => {
    const { testPost } = testRouter('users', router);
    testPost({ name: faker.name.findName() }).expect(201, done);
  });

  it('should handle http PATCH /resource/:id', done => {
    const { testPatch } = testRouter('users', router);
    testPatch(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should handle http PUT /resource/:id', done => {
    const { testPut } = testRouter('users', router);
    testPut(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should handle http DELETE /resource/:id', done => {
    const { testDelete } = testRouter('users', router);
    testDelete(1).expect(200, done);
  });
});
