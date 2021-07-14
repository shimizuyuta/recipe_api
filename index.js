require('dotenv').config();

const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;




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