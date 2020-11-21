const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');   //using express!!
const bodyParser = require('body-parser');
const events = require('events');

const app = express();
const port = 3000;
var emitter = new events.EventEmitter();
emitter.setMaxListeners(0)

// setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//endpoints
/*---------------------------------------------------------------*/

const orgRouter = require('./routes/organizations')
app.use(orgRouter);

const taskRouter = require('./routes/tasks')
app.use(taskRouter);

/*---------------------------------------------------------------*/
//listen
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);
