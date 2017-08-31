#### Configuration
  * `.gitignore`
  * `.eslintrc.json`
  * `.eslintignore`
  * `package.json`
  * `README.md`
* created the following directories to organize my code:
  * `lib`
  * `model`
  * `route`
  * `__test__`
* createdan HTTP server using the native NodeJS `http` module
* createdan object constructor that created a _simple resource_ with at least 3 properties
  * include an `_id` property that is set to a unique id (**hint:** you'll need to use `uuid`)
  * include two additional properties of my choice (ex: name, content, etc.)
* createda custom body parser module that uses promises to parse the JSON body of `POST` and `PUT` requests
* createda custom url parser module that returns a promise and uses the NodeJS `url` and `querystring` modules to parse the request url
* createda router constructor that handles requests to `GET`, `POST`, `PUT`, and `DELETE` requests
* createda storage module that will store resources by their schema type (ex: note) and id


## Tests _make an attempt at TDD today!!_
* wrote a test to ensure that my api returns a status code of 404 for routes that have not been registered
* wrote tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
 * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
  * _note: this will need to change if you complete the bonus point_
 * `GET`: test 200, it should contain a response body for a request made with a valid id
 * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `POST`: test 201, it should respond with the body content for a post request with a valid body
 * `PUT`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
 * `PUT`: test 204, it should respond with no body content for a put request with a valid body
 * `DELETE`: test 400, it should respond with 'bad request' if no resource id was provided
 * `DELETE`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
 * `DELETE`: test 204, it should respond with no body content for a request request with a valid resource id

## Server Endpoints
### `/api/simple-resource-name`
* `POST` request
 * pass data as stringifed JSON in the body of a **POST** request to createda new resource
 * successful status code of 201
* `PUT` request
 * pass data as stringifed JSON in the body of a **PUT** request to update an existing resource
 * if that resource does not exist, createdit
 * successful status code of 204
* `GET` request
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
 * successful status code of 200
* `DELETE` request
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
 * successful status code of 204
