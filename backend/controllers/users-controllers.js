const uuid = require('uuid/v4');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user-model');
const HttpError = require('../models/http-error');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await Users.find({}, '-Password');
  } catch {
    return next(
      new HttpError('Could Not Fetch Details.Please Try Again.', 500),
    );
  }
  res
    .status(200)
    .json({ Users: users.map((users) => users.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const { Name, Email_id, Roll_No, Room_No, Password, category } = req.body;

  let existingUser;
  try {
    existingUser = await Users.findOne({ Email_id: Email_id });
  } catch (err) {
    const error = new HttpError(
      'Some error occured, please try again later.',
      500,
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422,
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(Password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500,
    );
    return next(error);
  }

  const createdUser = new Users({
    Name, // name: name
    Email_id,
    Roll_No,
    Room_No,
    Password: hashedPassword,
    Permis: [],
    category,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.Email_id },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    Email_id: createdUser.Email_id,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { Email_id, Password } = req.body;

  // console.log(Email_id);
  let existingUser;
  try {
    existingUser = await Users.findOne({ Email_id: Email_id });
  } catch (error) {
    return next(new HttpError('Something went wrong!Please Try Again', 500));
  }

  if (!existingUser) {
    return next(
      new HttpError(
        'Could not identify user, credentials seem to be wrong.',
        401,
      ),
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(Password, existingUser.Password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500,
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401,
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.Email_id },
      process.env.JWT_KEY,
      { expiresIn: '1h' },
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.Email_id,
    token: token,
    name: existingUser.Name,
    category: existingUser.category,
  });
};

const changepassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const { prevPassword, newPassword } = req.body;
  const userid = req.params.uid;
  let id;
  try {
    id = await Users.findById(userid);
  } catch (err) {
    return next(new HttpError('Could Not find user.Please Try Again', 422));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(prevPassword, id.Password);
  } catch (err) {
    const error = new HttpError(
      'Could not change password, please check your credentials and try again.',
      500,
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not update status.',
      401,
    );
    return next(error);
  }

  let newhashPassword;
  try {
    newhashPassword = await bcrypt.hash(newPassword, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500,
    );
    return next(error);
  }
  id.Password = newhashPassword;
  try {
    await id.save();
  } catch (err) {
    return next(
      new HttpError('Could Not Update Password. Please Try Again.', 422),
    );
  }

  res.json({
    message: 'Password updated',
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.changepassword = changepassword;
