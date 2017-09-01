TO DO TODAY:
refactor the storage module to take advantage of the promisified fs module
use the bluebird Promise library as a way to overwrite the pre-existing Promise implementation in NodeJS
DONE refactor your response functionality to a modular component of the application
ensure that your passing in any dynamic error messages where applicable



documentation:
write a paragraph about what your API does
document any resources that helped you complete your assignment
define how another dev can 'get started' with your api on their own
document each of the available endpoints; including example request/response formats for each

# ~~Vanilla~~ Rocky Road API

## Description
This API allows you to define and GET/PUT/POST/DELETE a toy object that has a name, description, and unique ID. Additionally, you can store that toy within the object that represents memory. Basically, we are practicing writing a router from scratch, instead of using Express - meaning we explicitly define what happens when we POST/PUT/GET/DELETE to this API.

## Getting Started
```
Download from GitHub
npm i
```

## Endpoints & Request/Responses
Our endpoint is: /api/toy/

POST http://localhost:3000/api/toy
<!--
POST request
pass data as stringifed JSON in the body of a POST request to create a new resource
successful status code of 201
PUT request
pass data as stringifed JSON in the body of a PUT request to update an existing resource
if that resource does not exist, create it
successful status code of 204
GET request
pass ?id=<uuid> as a query string parameter to retrieve a specific resource (as JSON)
successful status code of 200
DELETE request
pass ?id=<uuid> in the query string to DELETE a specific resource
successful status code of 204 -->


## Resources I Used:
+ Demo code from Scott today (retyped)
+ Demo code from 07 code review (so, chat assignment) to get the test syntax right
+ Since we're building something based on Express, it made sense to look at the Express docs to see if they could be helpful: http://expressjs.com/en/guide/routing.html
+ https://eslint.org/docs/rules/no-debugger#when-not-to-use-it Debugger rules for eslint
+ How to kill a server on Stack Overflow https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
