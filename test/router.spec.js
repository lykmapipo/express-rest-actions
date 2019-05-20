import { createReadStream } from 'fs';
import { clear, testRouter, faker } from '@lykmapipo/express-test-helpers';
import { routerFor } from '../src/index';

describe('routerFor', () => {
  beforeEach(() => clear());

  const file = `${__dirname}/fixtures/test.txt`;

  const options = {
    version: '1.0.0',
    resource: 'users',
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

  it('should GET /resource', done => {
    const { testGet } = testRouter('users', router);
    testGet().expect(200, done);
  });

  it('should GET /resource/schema', done => {
    const { testGetSchema } = testRouter('users', router);
    testGetSchema().expect(200, done);
  });

  it('should GET /resource/export', done => {
    const { testGetExport } = testRouter('users', router);
    testGetExport()
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .expect(200, done);
  });

  it('should GET /resource/:id', done => {
    const { testGet } = testRouter('users', router);
    testGet(1).expect(200, done);
  });

  it('should POST /resource', done => {
    const { testPost } = testRouter('users', router);
    testPost({ name: faker.name.findName() }).expect(201, done);
  });

  it('should PATCH /resource/:id', done => {
    const { testPatch } = testRouter('users', router);
    testPatch(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should PUT /resource/:id', done => {
    const { testPut } = testRouter('users', router);
    testPut(1, { name: faker.name.findName() }).expect(200, done);
  });

  it('should DELETE /resource/:id', done => {
    const { testDelete } = testRouter('users', router);
    testDelete(1).expect(200, done);
  });
});
