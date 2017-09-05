# ~~Vanilla~~ Rocky Road API

## Description
It was a rocky road getting this API to work but hey, now it does something!
This API allows you to define and GET/PUT/POST/DELETE a toy object that has a name, description, and unique ID. Additionally, you can store that toy within the object that represents memory. Basically, we are practicing writing a router from scratch, instead of using Express - meaning we explicitly define what happens when we POST/PUT/GET/DELETE to this API.

## Getting Started
```
Download from GitHub
npm i
```

## Endpoints & Request/Responses
Our endpoint is: /api/toy/

Sample request:
```
POST http://localhost:3000/api/toy?name='barney' desc="purple dino"
```

Sample response:
```
{"name":"barney","desc":"purple dino","_id":"c84d19fd-2e41-4050-9fac-1f1882fa6e76"}
```

HTTP Methods Available:
POST http://localhost:3000/api/toy
_Allows you to post a toy with a name and a description to a json file which will be stored in /data/toy._
_Success status code of 201_

GET http://localhost:3000/api/toy
_Allows you to get a toy by unique id # from it's saved json file in /data/toy_
_Success status code of 200_

PUT http://localhost:3000/api/toy
_Allows you to update a toy's json file which will be stored in /data/toy or create a new one._
_Success status code of 204_

DELETE http://localhost:3000/api/toy
_Allows you to delete the toy & it's json file from /data/toy._
_Success status code of 204_


## Resources I Used:
+ Demo code from Scott today (retyped)
+ Demo code from 07 code review (so, chat assignment) to get the test syntax right
+ Since we're building something based on Express, it made sense to look at the Express docs to see if they could be helpful: http://expressjs.com/en/guide/routing.html
+ https://eslint.org/docs/rules/no-debugger#when-not-to-use-it Debugger rules for eslint
+ How to kill a server on Stack Overflow https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
