# Documentation:
  * What this API does:

  This project is practice in creating a basic API/HTTP server. It is an HTTP server, using a router. We have an object constructor making "toy" objects with four parameters (toy name, toy description, material used (ie- plastic), and the price of the toy). The goal is to POST (create) this toy object, PUT, GET and DELETE this object from the server. This is also practice in having a single 'in-memory' resource/model for persistence (only while the server is running). We are recreating the basic functionality of ExpressJS as a router. After this practice in building our own router functionality (??) we will learn more about using just Express going forward.

    * How to save resource data to the file system for a layer of data persistence.
    * How to refactor commonly used coding constructs into custom helper modules.

  * Any resources that helped me complete this assignment:

  * How another dev could 'get started' with my api on their own:
      - How do you clone this project?
      First fork from my repository, then clone from your repo, then create a branch.
      - How do you start using this project?
          1. You will need to have NodeJS installed on your machine.
          2. You will need to install httpie in one terminal window.
          3. Then start up nodemon in a separate terminal window.


# To get an object in terminal, paste this to test:
http POST :3000/api/toy name=barney desc='purple dino' price='$10' material=plastic

# Example responses:
* I realize the following is probably not what is being asked of me, but it's all I've got right now.
    - Then the following bad request info is displayed in terminal:
    ```
    HTTP/1.1 201 Created
    Connection: keep-alive
    Content-Type: application/json
    Date: Thu, 31 Aug 2017 02:19:24 GMT
    Transfer-Encoding: chunked

{
    "_id": "16ab953e-6627-433f-a0fe-0a6870f085a3",
    "desc": "purple dino",
    "material": "plastic",
    "name": "barney",
    "price": "$10"
}
    ```

# Packages and commands to remember:
  - In package.json's scripts, add- "start:debug": "DEBUG=http* nodemon server.js",

  - npm install (for node modules) -
  - npm install httpie -
  - npm install superagent - DONE
  - npm install uuid -
  - npm install -D jest -
    - npm test

  - node server.js or just nodemon (depending on the day??)
    - rs (restart, if needed)
  - run start: watch -
  - npm run start: debug -

  - npm run debugger - DONE
  - npm install bluebird (sets this as a dependency in package.json) -DONE

  I added the following to my package.json scripts:
  "debugger": "node inspect server.js",

  Then in terminal, within the project directory, type:
  npm run debugger

    - You should then see:
    > node inspect server.js

# Collaborators:
Michelle, Aaron, Isaac and Said.
