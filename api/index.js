require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./router')
const PORT = process.env.PORT || 3000;
const timeout = require('connect-timeout');
var createError = require('http-errors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use(timeout(parseInt(process.env.TIMEOUT || 6000)));
app.use(haltOnTimedout);

app.use('/',router)


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err,'err')
  if(err.status===404){
    res.status(404).send({'error_message______404':err.message})
  } else{
    console.log(err.status,'err_status')
    res.status(500).send({'error_message______500':err.message})

  }
});

function haltOnTimedout(req, res, next){
  console.log('haltOnTimeout: begin',req.timedout)
  if (!req.timedout) next()
}


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
 });