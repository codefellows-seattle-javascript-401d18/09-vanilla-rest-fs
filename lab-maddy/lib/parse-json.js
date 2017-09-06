'use strict';

const debug = require('debug')('http:parse-json');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT'){
      let body = ' ';

      req.on('data', buff => body += buff.toString());//build hte body
      req.on('end', ()=> {
        try {
          req.body = JSON.parse(body); //parse the body
          resolve(req);//going to resolve a req, when we resolve that successful case. we mutate the requrest as it goes through middleware then we catch it on the other side.
        } catch(e){ //mabye there was a parsing error, then we fall into the catch. s
          console.error(e);
          reject(e);
        }//don't need an else here but if you did you wouldnt' need hte return??
      });
      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return; //the return breaks us out of the 'if'. "stop execution adn return undeined". if we don't have this return it would roll right into the debug.
    }
    debug('parse-json GET || DELETE');
    resolve(req);
    //implicit return undefined.
  });
};
