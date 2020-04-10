const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user-model');
const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
  }
];

// const getUsers = (req, res, next) => {
//   res.json({ users: DUMMY_USERS });
// };
//with mongodb
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({users: users.map(user => user.toObject({ getters: true }))});
};


// const signup = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }
//   const { name, email, password } = req.body;

//   const hasUser = DUMMY_USERS.find(u => u.email === email);
//   if (hasUser) {
//     throw new HttpError('Could not create user, email already exists.', 422);
//   }

//   const createdUser = {
//     id: uuid(),
//     name, // name: name
//     email,
//     password
//   };

//   DUMMY_USERS.push(createdUser);

//   res.status(201).json({user: createdUser});
// };
//with mongo
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password} = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  const createdUser = new User({
    name,
    email,
    password,
    permis :[]
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};



// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   const identifiedUser = DUMMY_USERS.find(u => u.email === email);
//   if (!identifiedUser || identifiedUser.password !== password) {
//     throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
//   }

//   res.json({message: 'Logged in!'});
// };
//with mongo
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
