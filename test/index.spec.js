import { clear, expect, testGet } from '@lykmapipo/express-test-helpers';
import { app, getFor, getByIdFor } from '../src/index';

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
