#### getFor(optns) 

Create http get handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid getFor options | &nbsp; |
| optns.get | `Function`  | valid service function to invoke when get | &nbsp; |




##### Examples

```javascript

const { app, getFor } = require('@lykmapipo/express-rest-actions');

const get = (query, done) => done(null, { data:[ ... ] });
app.get('/v1/users', getFor({ get }));
```


##### Returns


- `Function`  valid express middleware to handle get request



#### schemaFor(optns) 

Create http get handler for schema of a given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid schemaFor options | &nbsp; |
| optns.getSchema | `Function`  | valid service function to invoke when get schema | &nbsp; |




##### Examples

```javascript

const { app, schemaFor } = require('@lykmapipo/express-rest-actions');

const getSchema = (query, done) => done(null, { ... });
app.get('/v1/users', schemaFor({ getSchema }));
```


##### Returns


- `Function`  valid express middleware to handle get schema request



#### getByIdFor(optns) 

Create http getById handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid getByIdFor options | &nbsp; |
| optns.getById | `Function`  | valid service function to invoke when getById | &nbsp; |




##### Examples

```javascript

const { app, getByIdFor } = require('@lykmapipo/express-rest-actions');

const getById = (query, done) => done(null, { ... });
app.get('/v1/users/:id', getByIdFor({ getById }));
```


##### Returns


- `Function`  valid express middleware to handle get by id request



#### postFor(optns) 

Create http post handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid postFor options | &nbsp; |
| optns.post | `Function`  | valid service function to invoke when post | &nbsp; |




##### Examples

```javascript

const { app, postFor } = require('@lykmapipo/express-rest-actions');

const post = (body, done) => done(null, { ... });
app.post('/v1/users', postFor({ post }));
```


##### Returns


- `Function`  valid express middleware to handle post request



#### patchFor(optns) 

Create http patch handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid patchFor options | &nbsp; |
| optns.patch | `Function`  | valid service function to invoke when patch | &nbsp; |




##### Examples

```javascript

const { app, patchFor } = require('@lykmapipo/express-rest-actions');

const patch = (query, done) => done(null, { ... });
app.patch('/v1/users/:id', patchFor({ patch }));
```


##### Returns


- `Function`  valid express middleware to handle patch request



#### putFor(optns) 

Create http put handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid putFor options | &nbsp; |
| optns.put | `Function`  | valid service function to invoke when put | &nbsp; |




##### Examples

```javascript

const { app, putFor } = require('@lykmapipo/express-rest-actions');

const put = (query, done) => done(null, { ... });
app.put('/v1/users/:id', putFor({ put }));
```


##### Returns


- `Function`  valid express middleware to handle put request



#### deleteFor(optns) 

Create http delete handler for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid deleteFor options | &nbsp; |
| optns.del | `Function`  | valid service function to invoke when delete | &nbsp; |
| optns.soft&#x3D;false | `Boolean`  | whether to invoke soft delete | *Optional* |




##### Examples

```javascript

const { app, deleteFor } = require('@lykmapipo/express-rest-actions');

const del = (query, done) => done(null, { ... });
app.delete('/v1/users/:id', deleteFor({ del }));
```


##### Returns


- `Function`  valid express middleware to handle delete request



#### routerFor(optns) 

Create http resource router for given service options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid routerFor options | &nbsp; |
| optns.resource | `String`  | valid resource name to be used as http path | &nbsp; |
| optns.get | `Function`  | valid service function to invoke when get | &nbsp; |
| optns.getSchema | `Function`  | valid service function to invoke when get schema | *Optional* |
| optns.getById | `Function`  | valid service function to invoke when getById | &nbsp; |
| optns.post | `Function`  | valid service function to invoke when post | &nbsp; |
| optns.patch | `Function`  | valid service function to invoke when patch | &nbsp; |
| optns.put | `Function`  | valid service function to invoke when put | &nbsp; |
| optns.del | `Function`  | valid service function to invoke when delete | &nbsp; |
| optns.soft&#x3D;false | `Boolean`  | whether to invoke soft router | *Optional* |
| optns.version&#x3D;&#x27;1.0.0&#x27; | `String`  | valid api version to append on path | *Optional* |




##### Examples

```javascript

const { app, routerFor } = require('@lykmapipo/express-rest-actions');

const options = { get: ..., post: ..., del: ... };
app.use(routerFor(options));
```


##### Returns


- `Function`  valid express middleware to handle router request




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
