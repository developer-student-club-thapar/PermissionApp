const HttpError = require('../models/http-error');
const Societypermi = require('../models/Societypermi-model');
const EarlyLeavepermi = require('../models/EarlyLeavepermi-model');
const Librarypermi = require('../models/Librarypermi-model');
const LateEntrypermi = require('../models/LateEntrypermi-model');
var nodemailer = require('nodemailer');
const factory = require('./handlerFactory');

//display all society requests
exports.getAllSocietyPermi = factory.getAllPermi(Societypermi);

//display all early leave requests
exports.getAllEarlyLeavePermi = factory.getAllPermi(EarlyLeavepermi);

//display all library requests
exports.getAllLibraryPermi = factory.getAllPermi(Librarypermi);

//display all lateentry requests
exports.getAllLateEntryPermi = factory.getAllPermi(LateEntrypermi);

//to get all the permis made by a particular user
const getPermisByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let permislib;
  try {
    permislib = await Librarypermi.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permissoc;
  try {
    permissoc = await Societypermi.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permisear;
  try {
    permisear = await EarlyLeavepermi.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permilate;
  try {
    permilate = await LateEntrypermi.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }

  permislib = permislib.concat(permissoc).concat(permisear).concat(permilate);
  permislib.sort((a, b) => (a._id > b._id ? -1 : 1));

  res.json({
    All_permis_by_user: permislib.map((late) =>
      late.toObject({ getters: true }),
    ),
  });
};

const getAllPermi = async (req, res, next) => {
  let permis;
  try {
    permis = await Librarypermi.find({}, '-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permissoc;
  try {
    permissoc = await Societypermi.find({}, '-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permisear;
  try {
    permisear = await EarlyLeavepermi.find({}, '-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }

  let permislate;
  try {
    permislate = await LateEntrypermi.find({}, '-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }

  permis = permis.concat(permissoc).concat(permisear).concat(permislate);
  permis.sort((a, b) => (a._id > b._id ? 1 : -1));
  res.json({
    All_permis_by_user: permis.map((permi) =>
      permi.toObject({ getters: true }),
    ),
  });
};

const getAllPermiForCaretaker = async (req, res, next) => {
  let permis;
  try {
    permis = await Librarypermi.find({
      status: ['pending', 'askedParent', 'approvedParent'],
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permissoc;
  try {
    permissoc = await Societypermi.find({
      status: ['pending', 'askedParent', 'approvedParent'],
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permisear;
  try {
    permisear = await EarlyLeavepermi.find({
      status: ['pending', 'askedParent', 'approvedParent'],
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permislate;
  try {
    permislate = await LateEntrypermi.find({
      status: ['pending', 'askedParent', 'approvedParent'],
    });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }

  permis = permis.concat(permissoc).concat(permisear).concat(permislate);
  permis.sort((a, b) => (a._id > b._id ? 1 : -1));
  res.json({
    All_permis_by_user: permis.map((permi) =>
      permi.toObject({ getters: true }),
    ),
  });
};

//Previous accepetd requests by warden/caretaker.
const getAcceptedPermiForCaretaker = async (req, res, next) => {
  let permis;
  try {
    permis = await Librarypermi.find({ status: 'accepted' });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permissoc;
  try {
    permissoc = await Societypermi.find({ status: 'accepted' });
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permisear;
  try {
    permisear = await EarlyLeavepermi.find({ status: 'accepted' });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }
  let permislate;
  try {
    permislate = await LateEntrypermi.find({ status: 'accepted' });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500,
    );
    return next(error);
  }

  permis = permis.concat(permissoc).concat(permisear).concat(permislate);
  permis.sort((a, b) => (a._id > b._id ? 1 : -1));
  res.json({
    All_permis_by_user: permis.map((permi) =>
      permi.toObject({ getters: true }),
    ),
  });
};

//creation of permis early leave
const earlyLeave = { room_num, destination, outtime, date, creator };
exports.createPermiEarlyLeave = factory.createOne(EarlyLeavepermi, earlyLeave);

//create society permi with database
const societyPermi = { room_num, intime, outtime, society_name, date, creator };
exports.createPermiSociety = factory.createOne(Societypermi, societyPermi);

//create permi for library
const libraryPermi = { room_num, intime, outtime, date, creator };
exports.createPermiLibrary = factory.createOne(Librarypermi, libraryPermi);

//creating permis for lateentry
const lateEntry = { room_num, destination, intime, date, creator };
exports.createPermiLateEntry = factory.createOne(LateEntrypermi, lateEntry);

// update status pending to done (society)
exports.updatePermiSociety = factory.updateOne(Societypermi);

// update status pending to done (library)
exports.updatePermiLibrary = factory.updateOne(Librarypermi);

// update status pending to done (early leave)
exports.updatePermiearly = factory.updateOne(EarlyLeavepermi);

// update status pending to done (Late Entry)
exports.updatePermiLate = factory.updateOne(LateEntrypermi);

// delete society permission
exports.deleteUserSociety = factory.deleteOne(Societypermi);

// delete library permission
exports.deleteUserLibrary = factory.deleteOne(Librarypermi);

// delete Late Entry permission
exports.deleteUserLate = factory.deleteOne(LateEntrypermi);

// delete Early leave permission
exports.deleteUserEarly = factory.deleteOne(EarlyLeavepermi);

//email credentials sending to parents.
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hostel.permission.ask@gmail.com',
    pass: 'hostelpermission1',
  },
});
var rand, mailOptions, host, link;

const sendMail = async (req, res, next) => {
  console.log('request reched');
  let userId = req.params.uid;
  console.log(userId);
  rand = userId;
  host = req.get('host');
  link = 'http://' + req.get('host') + '/api/permi/verify?id=' + rand;
  const { parentMail, destination, starttime, endtime, date } = req.body;
  mailOptions = {
    to: parentMail,
    subject: 'Permission for leaving hostel',
    html:
      'Hello,<br> Your ward is seeking permission for visiting ' +
      destination +
      ' from the hostel from ' +
      starttime +
      ' to ' +
      endtime +
      ' on ' +
      date +
      ' Please Click on the link to give your consent to send your child out.<br><a href=' +
      link +
      '>Click here to approve</a>',
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ' + response.message);
      res.end('sent');
    }
  });
  res.status(200).json({ message: 'Mail sent!' });
};

const verifyEmail = async (req, res, next) => {
  console.log('verified!');
  console.log(req.protocol + ':/' + req.get('host'));
  if (req.protocol + '://' + req.get('host') == 'http://' + host) {
    console.log('Domain is matched. Information is from Authentic email');
    if (req.query.id == rand) {
      const userid = rand;
      let id;
      try {
        id = await LateEntrypermi.findById(userid);
      } catch (err) {
        return next(new HttpError('Could not update. Please try Again', 500));
      }
      //console.log(id);
      id.status = 'approvedParent';
      //console.log(id);
      try {
        await id.save();
      } catch (err) {
        const error = new HttpError('Could Not Update.Please Try Againu.', 500);
        return next(error);
      }
      console.log('email is verified');
      res.end(
        '<h1> ' +
          mailOptions.to +
          ', Your consent has been recorded. Thank you!',
      );
    } else {
      console.log('email is not verified');
      res.end('<h1>Bad Request</h1>');
    }
  } else {
    res.end('<h1>Request is from unknown source');
  }
};
//exports.getPlaceById = getSocietyPermiById;

exports.getAllPermi = getAllPermi;
exports.getPermisByUserId = getPermisByUserId;
exports.getAllPermiForCaretaker = getAllPermiForCaretaker;
exports.getAcceptedPermiForCaretaker = getAcceptedPermiForCaretaker;

exports.sendMail = sendMail;
exports.verifyEmail = verifyEmail;
