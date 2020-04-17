const uuid = require('uuid/v4');
const mongoose=require('mongoose');
const { validationResult } = require('express-validator');
const Users=require('../models/user-model');
const HttpError = require('../models/http-error');

const getUsers = async (req, res, next) => {
  let users;
  try{
    users=await Users.find({},'-Password')
  }catch{
     return next(new HttpError('Could Not Fetch Details.Please Try Again.',500));
  }
  res.status(200).json({Users: users.map(users=>users.toObject({getters:true}))});
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { Name, Email_id, Roll_No, room_num, Password} = req.body;
  let existingUser;
  try{
     existingUser=await Users.findOne({Email_id:Email_id});
  }catch(err){
    return next(new HttpError('Something went wrong!Please try again'),500);
  }

  if(existingUser)
  {
    return next(new HttpError('User already exist.Please try instead',401));
  }
  const createdUser = new Users ({
    Name, // name: name
    Email_id,
    Roll_No,
    room_num,
    Password,
    Permis :[]
  });
  
  try{
    await createdUser.save();
  }catch(err)
  {
    return next(new HttpError('Creating request for the user Failed.Please Try again.',500));
  }
  res.status(201).json({user: createdUser.toObject({getters:true})});
};

const login = async (req, res, next) => {
  const { Email_id, Password } = req.body;
  let finduser;
  try {
     finduser=await Users.findOne({Email_id:Email_id});
  } catch (error) {
    return next(new HttpError('Something went wrong!Please Try Again',500));
  }
  
  if(!finduser || finduser.Password!==Password)
  {
    return next(new HttpError('Could not identify user, credentials seem to be wrong.', 401));
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
