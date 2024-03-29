# express-rest-actions

[![Build Status](https://app.travis-ci.com/lykmapipo/express-rest-actions.svg?branch=master)](https://app.travis-ci.com/lykmapipo/express-rest-actions)
[![Dependencies Status](https://david-dm.org/lykmapipo/express-rest-actions.svg)](https://david-dm.org/lykmapipo/express-rest-actions)
[![Coverage Status](https://coveralls.io/repos/github/lykmapipo/express-rest-actions/badge.svg?branch=master)](https://coveralls.io/github/lykmapipo/express-rest-actions?branch=master)
[![GitHub License](https://img.shields.io/github/license/lykmapipo/express-rest-actions)](https://github.com/lykmapipo/express-rest-actions/blob/master/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@lykmapipo/express-rest-actions)](https://www.npmjs.com/package/@lykmapipo/express-rest-actions)

Opinionated rest actions for express

## Installation

```sh
$ npm install --save @lykmapipo/express-rest-actions
```

## Usage
```js
import { 
  app, getFor, getByIdFor, postFor, 
  patchFor, putFor, deleteFor, routerFor 
} from '@lykmapipo/express-rest-actions';

const options = { 
  get: ..., getById: ..., 
  post: ..., put: ..., 
  patch: ..., del: ... 
};

app.get('/v1/users', getFor(options));
app.get('/v1/users/:id', getByIdFor(options));
app.post('/v1/users', postFor(options));
app.put('/v1/users/:id', putFor(options));
app.patch('/v1/users/:id', patchFor(options));
app.delete('/v1/users/:id', deleteFor(options));

const router = routerFor(options);
app.use(router);

```


## Testing

- Clone this repository

- Install all development dependencies

```sh
$ npm install
```

- Then run test

```sh
$ npm test
```

## How to contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## LICENSE

MIT License

Copyright (c) lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
