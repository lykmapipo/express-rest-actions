import { createReadStream, readFileSync } from 'fs';
import {
  clear,
  expect,
  testGet,
  testDownload,
  testPost,
  testPatch,
  testPut,
  testDelete,
} from '@lykmapipo/express-test-helpers';
import {
  app,
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
} from '../src/index';

describe('getFor', () => {
  beforeEach(() => clear());

  it('should GET /resource with provided service', done => {
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

  it('should GET /resource with no service', done => {
    app.get('/v1/users', getFor());
    testGet('/v1/users').expect(405, done);
  });

  it('should GET /resource with provided service and params', done => {
    const results = { data: [] };
    const get = ({ filter }, cb) => {
      expect(filter).to.exist.and.be.eql({ group: 'testers' });
      cb(null, results);
    };
    app.get('/v1/users/:group', getFor({ get }));
    testGet('/v1/users/testers')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });
});

describe('schemaFor', () => {
  beforeEach(() => clear());

  it('should GET /resource/schema with provided service', done => {
    const schema = {};
    const getSchema = (query, cb) => cb(null, schema);
    app.get('/v1/users/schema', schemaFor({ getSchema }));
    testGet('/v1/users/schema')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(schema);
        done(error, body);
      });
  });

  it('should GET /resource/schema with no service', done => {
    app.get('/v1/users/schema', schemaFor());
    testGet('/v1/users/schema').expect(405, done);
  });

  it('should GET /resource/schema with provided service and params', done => {
    const schema = {};
    const getSchema = ({ filter }, cb) => {
      expect(filter).to.exist.and.be.eql({ group: 'testers' });
      cb(null, schema);
    };
    app.get('/v1/users/:group/schema', schemaFor({ getSchema }));
    testGet('/v1/users/testers/schema')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(schema);
        done(error, body);
      });
  });
});

describe('downloadFor', () => {
  beforeEach(() => clear());

  it('should GET /resource/download with provided service', done => {
    const file = `${__dirname}/fixtures/test.txt`;
    const fileContent = readFileSync(file).toString('base64');

    const download = (query, cb) => {
      const fileName = 'test.txt';
      const readStream = createReadStream(file);
      cb(null, { fileName, readStream });
    };

    app.get('/v1/users/downloads', downloadFor({ download }));

    testDownload('/v1/users/downloads')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });

  it('should GET /resource/download with no service', done => {
    app.get('/v1/users/download', downloadFor());
    testDownload('/v1/users/download').expect(405, done);
  });

  it('should GET /resource/download with provided service with params', done => {
    const file = `${__dirname}/fixtures/test.txt`;
    const fileContent = readFileSync(file).toString('base64');

    const download = ({ filter }, cb) => {
      expect(filter).to.exist.and.be.eql({ group: 'testers' });
      const fileName = 'test.txt';
      const readStream = createReadStream(file);
      cb(null, { fileName, readStream });
    };

    app.get('/v1/users/:group/downloads', downloadFor({ download }));

    testDownload('/v1/users/testers/downloads')
      .expect(200)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect('Content-Disposition', 'attachment; filename="test.txt"')
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body.toString('base64')).to.be.equal(fileContent);
        done(error, body);
      });
  });
});

describe('getByIdFor', () => {
  beforeEach(() => clear());

  it('should GET /resource/:id with provided service', done => {
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

  it('should GET /resource/:id with no service', done => {
    app.get('/v1/users/:id', getByIdFor());
    testGet('/v1/users/1').expect(405, done);
  });

  it('should GET /resource/:id with provided service with params', done => {
    const results = {};
    const getById = ({ filter }, cb) => {
      expect(filter).to.exist.and.be.eql({ group: 'testers' });
      cb(null, results);
    };
    app.get('/v1/users/:group/:id', getByIdFor({ getById }));
    testGet('/v1/users/testers/1')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });
});

describe('postFor', () => {
  beforeEach(() => clear());

  it('should POST /resource with provided service', done => {
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

  it('should POST /resource with no service', done => {
    app.post('/v1/users', postFor());
    testPost('/v1/users', {}).expect(405, done);
  });
});

describe('patchFor', () => {
  beforeEach(() => clear());

  it('should PATCH /resource/:id with provided service', done => {
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

  it('should PATCH /resource/:id with no service', done => {
    app.patch('/v1/users/:id', patchFor());
    testPatch('/v1/users/1', {}).expect(405, done);
  });
});

describe('putFor', () => {
  beforeEach(() => clear());

  it('should PUT /resource/:id with provided service', done => {
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

  it('should PUT /resource/:id with no service', done => {
    app.put('/v1/users/:id', putFor());
    testPut('/v1/users/1', {}).expect(405, done);
  });
});

describe('deleteFor', () => {
  beforeEach(() => clear());

  it('should DELETE /resource/:id with provided service', done => {
    const results = {};
    const del = (body, cb) => cb(null, results);
    app.delete('/v1/users/:id', deleteFor({ del }));
    testDelete('/v1/users/1')
      .expect(200)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.be.eql(results);
        done(error, body);
      });
  });

  it('should DELETE /resource/:id with no service', done => {
    app.delete('/v1/users/:id', deleteFor());
    testDelete('/v1/users/1').expect(405, done);
  });
});
