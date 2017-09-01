# *Vanilla Ice Cream Server*

# Server request and response demonstration.
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

## Project Description
Using node.js, HTTP, superagent, cowsay, and querystring I have created a Server that responds to different GET and POST responses from users.

## Table of Contents
+ [Installation](#installation)
+ [Usage](#Usage)
+ [About](#About)

### Installation:
+ Fork this repository and clone the forked repository anywhere you'd like on your computer.

+ Open your terminal
  + Navigate to the folder where you did your git clone with your newly forked repository.
  + Make sure you are in the root directory IE. lab-gavin.;
  + Type npm i into your terminal.
+ Open two terminal windows.
+ In the firt terminal type
  + `npm run start:watch`
  + This creates a local server which should log to the console
    + `server up:: 3000`
+ In the second terminal window
  + `brew install httpie`
  + This installs httpie which is a package that allows you to make calls to our local server.

+ Here are a list of commands you may use to make API calls to this vanilla server.

  + `http GET localhost:3000/api/toy?_id=''` will return an item from the database.
      + example. `http GET localhost:3000/api/toy?_id='ee30e86a-36ee-4843-b47e-a252531bac41'`


  + `http POST localhost:3000/api/toy name=name desc=desc` will store a new item into the database.
    + example. `http POST localhost:3000/api/toy
        name=PowerRanger desc=I'm an awesome PowerRanger`


  + `http PUT localhost:3000/api/toy?_id='someid name=new name desc=new desc'` will replace the new information with the ID that was provided.
    + example. `http PUT localhost:3000/api/toy?_id='96d6514b-b1da-4a11-a8a7-b044436a23ab' name=PowerRangerGreen desc=Totally awesome Green Ranger`

  + `http DELETE localhost:3000/api/toy?_id='some Id'` will return 404.
    + example. `http DELETE localhost:3000/api/toy?_id='ee30e86a-36ee-4843-b47e-a252531bac41'`.

### Usage
This app is completely free to be used however you'd like!


### About
I am currently a Full Stack Web Developer with focus in UX. If you are interested in using me for any of your projects please feel free to reach out to me!
