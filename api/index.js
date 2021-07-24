require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./router')
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SESSION_SECRET
const timeout = require('connect-timeout');
var createError = require('http-errors');
var session = require('express-session')
var helmet = require('helmet')
const cookieParser = require('cookie-parser');
app.use(helmet())

app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: true,
  secure: false,
  maxage: 1000 * 60 * 1
  }
}));
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