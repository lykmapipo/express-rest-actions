import { clear, expect, testGet } from '@lykmapipo/express-test-helpers';
import { app, getFor } from '../src/index';

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
