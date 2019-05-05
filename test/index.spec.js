import {
  clear,
  expect,
  testGet,
  testPost,
  testPatch,
  testPut,
} from '@lykmapipo/express-test-helpers';
import {
  app,
  getFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
} from '../src/index';

describe('getFor', () => {
  beforeEach(() => clear());

  it('should handle http GET /resource with provided service', done => {
    const results = { data: [] };
    const get = (query, cb) => cb(null, results);
    app.get('/v1/users', getFor({ get }));
    testGet('/v1/users')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should handle http GET /resource with no service', done => {
    app.get('/v1/users', getFor());
    testGet('/v1/users').expect(405, done);
  });
});

describe('getByIdFor', () => {
  beforeEach(() => clear());

  it('should handle http GET /resource/:id with provided service', done => {
    const results = {};
    const getById = (query, cb) => cb(null, results);
    app.get('/v1/users/:id', getByIdFor({ getById }));
    testGet('/v1/users/1')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should handle http GET /resource/:id with no service', done => {
    app.get('/v1/users/:id', getByIdFor());
    testGet('/v1/users/1').expect(405, done);
  });
});

describe('postFor', () => {
  beforeEach(() => clear());

  it('should handle http POST /resource with provided service', done => {
    const results = {};
    const post = (body, cb) => cb(null, results);
    app.post('/v1/users', postFor({ post }));
    testPost('/v1/users', results)
      .expect(201)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should handle http POST /resource with no service', done => {
    app.post('/v1/users', postFor());
    testPost('/v1/users', {}).expect(405, done);
  });
});

describe('patchFor', () => {
  beforeEach(() => clear());

  it('should handle http PATCH /resource/:id with provided service', done => {
    const results = {};
    const patch = (body, cb) => cb(null, results);
    app.patch('/v1/users/:id', patchFor({ patch }));
    testPatch('/v1/users/1', results)
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should handle http PATCH /resource/:id with no service', done => {
    app.patch('/v1/users/:id', patchFor());
    testPatch('/v1/users/1', {}).expect(405, done);
  });
});

describe('putFor', () => {
  beforeEach(() => clear());

  it('should handle http PUT /resource/:id with provided service', done => {
    const results = {};
    const put = (body, cb) => cb(null, results);
    app.put('/v1/users/:id', putFor({ put }));
    testPut('/v1/users/1', results)
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should handle http PUT /resource/:id with no service', done => {
    app.put('/v1/users/:id', putFor());
    testPut('/v1/users/1', {}).expect(405, done);
  });
});
