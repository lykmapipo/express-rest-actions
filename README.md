# express-rest-actions

[![Build Status](https://travis-ci.org/lykmapipo/express-rest-actions.svg?branch=master)](https://travis-ci.org/lykmapipo/express-rest-actions)
[![Dependencies Status](https://david-dm.org/lykmapipo/express-rest-actions.svg?style=flat-square)](https://david-dm.org/lykmapipo/express-rest-actions)

Opinionated rest actions for express

## Installation

```sh
$ npm install --save @lykmapipo/express-rest-actions
```

## Usage
```js
const { 
  app, getFor, getByIdFor, postFor, 
  patchFor, putFor, deleteFor, routerFor 
} = require('@lykmapipo/express-rest-actions');

const options = { ... }

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
