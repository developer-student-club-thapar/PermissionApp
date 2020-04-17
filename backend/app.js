const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const permiRoutes = require('./routes/permi-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();


app.use(bodyParser.json());
app.use('/api/permi', permiRoutes);
app.use('/api/users', usersRoutes);
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

 mongoose.connect('mongodb+srv://Samiksha_14:permiapp@permissionapp-nn3fo.mongodb.net/permi?retryWrites=true&w=majority',{ useNewUrlParser: true })
 .then(()=>app.listen(5000))
 .catch(err=>console.log(err));
//mongoose.connect('mongodb+srv://payal:Permi_@cluster0-nz0oh.mongodb.net/sam?retryWrites=true&w=majority',{ useNewUrlParser: true })
//.then(()=>app.listen(5000))
//.catch(err=>console.log(err));


