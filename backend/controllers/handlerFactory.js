const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Users = require('../models/user-model');

exports.getAllPermi = (Model) => async (req, res, next) => {
    let property;
    try {
      property = await Model.find({}, '-category');
    } catch (err) {
      const error = new HttpError(
        'Not able to get the data,Please try Again',
        500,
      );
      return next(error);
    }
    if (!property || property.length == 0) {
      const error = new HttpError('Cannot find any data', 404);
      return next(error);
    }
  
    res.json({
      property: property.map((property) => property.toObject({ getters: true })),
    });
  };

exports.createOne = (Model, bodyObject) => async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422),
      );
    }
  
    bodyObject = req.body;
  
    const document = new Model(bodyObject);
  
    let user;
    try {
      user = await Users.findById(creator);
    } catch (err) {
      return next(new HttpError('Creating Permi Failed.Please Try Again.', 500));
    }
  
    if (!user) {
      return next(new HttpError('Could Not fid user for the provided id', 404));
    }
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await document.save({ session: sess });
      user.Permis.push(document);
      await user.save({ session: sess });
      sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        'Creating request for Early Leave Failed.Please Try Again.',
        500,
      );
      return next(error);
    }
  
    res.status(201).json({ data: document });
  };

exports.updateOne = (Model) => async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422),
      );
    }
  
    const { status } = req.body;
    const userid = req.params.uid;
    let document;
    try {
      document = await Model.findById(userid);
    } catch (err) {
      return next(new HttpError('Could not update. Please try Again', 500));
    }
    //console.log(document);
    document.status = status;
    //console.log(document);
    try {
      await document.save();
    } catch (err) {
      const error = new HttpError('Could Not Update.Please Try Againu.', 500);
      return next(error);
    }
  
    res.status(200).json({ data: document.toObject({ getters: true }) });
  };

exports.deleteOne = (Model) => async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed.Please Check Your Data', 422),
      );
    }
  
    let userid = req.params.uid;
    let document;
    try {
      document = await Model.findById(userid).populate('creator');
    } catch (err) {
      return next(
        new HttpError('Could Not delete the data.Please Try Again.', 500),
      );
    }
  
    if (!document) {
      return next(new HttpError('Could not find data for this id', 404));
    }
  
    try {
      const sess = await mongoose.startSession();
      sess.commitTransaction();
      await document.remove({ session: sess });
      await document.creator.Permis.pull(document);
      await document.creator.save({ session: sess });
      sess.commitTransaction();
    } catch (err) {
      return next(
        new HttpError('Could Not Delete the data.Please Try Again.', 500),
      );
    }
  
    res.status(200).json({ message: 'Data Deleted' });
  };
