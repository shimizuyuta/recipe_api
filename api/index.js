require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./router')
const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',router)


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.sendStatus(err.status || 500);
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
 });