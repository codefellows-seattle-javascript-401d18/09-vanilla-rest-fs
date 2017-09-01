#### Feature Tasks  
* created the app's scaffold including the following directories to organize my code:  
  * `lib`  
  * `model`  
  * `route`  
  * `__test__`  
* created the folowing folders:  
  * `.gitignore`  
  * `.eslintrc.json`  
  * `.eslintignore`  
  * `package.json`  
  * `README.md`  


* refactored the storage module to take advantage of the promisified `fs` module  
  - used the bluebird Promise library as a way to overwrite the pre-existing Promise implementation in NodeJS  
* refactored my response functionality to a modular component of the application  

## Server Endpoints  
### `/api/simple-resource-name`  
* `POST` request  
 * pass data as stringifed JSON in the body of a **POST** request to create a new resource  
 * successful status code of 201  
* `PUT` request  
 * pass data as stringifed JSON in the body of a **PUT** request to update an existing resource  
 * if that resource does not exist, create it  
 * successful status code of 204  
* `GET` request  
 * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)  
 * successful status code of 200  
* `DELETE` request  
 * pass `?id=<uuid>` in the query string to **DELETE** a specific resource  
 * successful status code of 204  

#### still not done with the DELET and the Testing.  
