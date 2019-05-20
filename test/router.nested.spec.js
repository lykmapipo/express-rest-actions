import { createReadStream } from 'fs';
import { clear, testRouter, faker } from '@lykmapipo/express-test-helpers';
import { routerFor } from '../src/index';

describe('routerFor - nested resources', () => {
  beforeEach(() => clear());

  const file = `${__dirname}/fixtures/test.txt`;

  const paths = {
    pathSingle: '/users/:user/comments/:id',
    pathList: '/users/:user/comments',
    pathSchema: '/users/:user/comments/schema',
    pathExport: '/users/:user/comments/export',
  };
  const options = {
    version: '1.0.0',
    ...paths,
    get: (query, cb) => cb(null, { data: [] }),
    getSchema: (query, cb) => cb(null, {}),
    export: (query, cb) => {
      const fileName = 'test.txt';
      const readStream = createReadStream(file);
      cb(null, { fileName, readStream });
    },
    getById: (query, cb) => cb(null, {}),
    post: (body, cb) => cb(null, body),
    patch: (query, cb) => cb(null, {}),
    put: (query, cb) => cb(null, {}),
    del: (query, cb) => cb(null, {}),
  };
  const router = routerFor(options);

  it('should GET /resource/:id/resource', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1 }).expect(200, done);
  });

  it('should GET /resource/:id/resource/schema', done => {
    const { testGetSchema } = testRouter(paths, router);
    testGetSchema({ user: 1 }).expect(200, done);
  });

  it('should GET /resource/:id/resource/export', done => {
    const { testGetExport } = testRouter(paths, router);
    testGetExport({ user: 1 })
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should GET /resource/:id/resource/:id', done => {
    const { testGet } = testRouter(paths, router);
    testGet({ user: 1, id: 1 }).expect(200, done);
  });

  it('should POST /resource/:id/resource', done => {
    const { testPost } = testRouter(paths, router);
    testPost({ user: 1, name: faker.name.findName() }).expect(201, done);
  });

  it('should PATCH /resource/:id/resource/:id', done => {
    const { testPatch } = testRouter(paths, router);
    testPatch({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should PUT /resource/:id/resource/:id', done => {
    const { testPut } = testRouter(paths, router);
    testPut({ user: 1, id: 1 }, { name: faker.name.findName() }).expect(
      200,
      done
    );
  });

  it('should DELETE /resource/:id/resource/:id', done => {
    const { testDelete } = testRouter(paths, router);
    testDelete({ user: 1, id: 1 }).expect(200, done);
  });
});
