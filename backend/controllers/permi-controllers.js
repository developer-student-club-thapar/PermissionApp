const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Societypermi = require('../models/permi-model');
const User = require('../models/user-model');

let DUMMY_PLACES_EARLY_LEAVE = [
  {
    id: 'pe',
    room_num: 'a21',
    destination : 'homee',
    intime : '5.00pm',
    status: 'pending',
    creator: 'u1'
    // have to make status pending by default
  }
];

let DUMMY_PERMI_SOCIETY = [
  {
    id: 'ps',
    room_num: 'a21',
    intime : '5.00pm',
    outtime : '3pm',
    society_name : 'uurja' , 
    creator: 'u1',
    status : 'pending'
    // have to make status pending by default
  }
];


let DUMMY_PERMI_LIBRARY = [
  {
    id: 'pl',
    room_num: 'a21',
    intime : '5.00pm',
    outtime : '3pm',
     status : 'pending',
    creator: 'u1'
    // have to make status pending by default
  }
];


//for permi- details withouut mongodb
const getSocietyPermiById = (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  const place = DUMMY_PERMI_SOCIETY.find(p => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }
  res.json({ place });
};


//display all society requests
const getAllSocietyPermi = (req, res, next) => {
 res.json({ All_society_permis : DUMMY_PERMI_SOCIETY });
};


//display all early leave requests
const getAllEarlyLeavePermi = (req, res, next) => {
 res.json({ All_Early_Leave_permis : DUMMY_PLACES_EARLY_LEAVE });
};


//display all library requests
const getAllLibraryPermi = (req, res, next) => {
 res.json({ All_library_permis : DUMMY_PERMI_LIBRARY });
};


//to get all the permis made by a particular user
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  let permis = DUMMY_PERMI_SOCIETY.filter(p => {
    return p.creator === userId;
  });
  permislib = DUMMY_PERMI_LIBRARY.filter(p => {
    return p.creator === userId;
  });
  permisear =  DUMMY_PLACES_EARLY_LEAVE.filter(p => {
    return p.creator === userId;
  });

  permis = permis.concat(permislib).concat(permisear);
  if (!permis || permis.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ permis });
};



//to get all the permis made by all users
const getAllPermi = (req, res, next) => {

  let permis = DUMMY_PERMI_SOCIETY;
  permislib = DUMMY_PERMI_LIBRARY;
  permisear =  DUMMY_PLACES_EARLY_LEAVE;

  permis = permis.concat(permislib).concat(permisear);
  if (!permis || permis.length === 0) {
    return next(
      new HttpError('No requests', 404)
    );
  }
  res.json({ permis });
};



//creation of permis early leave
const createPermiEarlyLeave = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { room_num, destination, intime, creator } = req.body;

  
  const createdPermi = {
    id: uuid(),
    room_num,
    destination,
    intime,
    creator
  };

  DUMMY_PLACES_EARLY_LEAVE.push(createdPermi); 

  res.status(201).json({ place: createdPermi });
}; 


//create society permi without database
const createPermiSociety = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, intime, outtime, society_name, status, creator } = req.body;
  const createdPermi = {
    id: uuid(),
    room_num,
    intime,
    outtime,
    society_name,
    status,
    creator
  };

  DUMMY_PERMI_SOCIETY.push(createdPermi);

  res.status(201).json({ place: createdPermi });
};


//create permi for library
const createPermiLibrary = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, intime, outtime,status,creator } = req.body;
  const createdPermi = {
    id: uuid(),
    room_num,
    intime,
    outtime,
    status,
    creator
  };

  DUMMY_PERMI_LIBRARY.push(createdPermi);

  res.status(201).json({ place: createdPermi });
};



// update status pending to done (society) without db
const updatePermiSociety = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const placeId = req.params.pid;

  const updatedPermi = { ...DUMMY_PERMI_SOCIETY.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PERMI_SOCIETY.findIndex(p => p.id === placeId);
  updatedPermi.status = status;

  DUMMY_PERMI_SOCIETY[placeIndex] = updatedPermi;

  res.status(200).json({ place: updatedPermi });
};




// update status pending to done (library)
const updatePermiLibrary = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const placeId = req.params.pid;

  const updatedPermi = { ...DUMMY_PERMI_LIBRARY.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PERMI_LIBRARY.findIndex(p => p.id === placeId);
  updatedPermi.status = status;

  DUMMY_PERMI_LIBRARY[placeIndex] = updatedPermi;

  res.status(200).json({ place: updatedPermi });
};



// update status pending to done (early leave)
const updatePermiearly = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const placeId = req.params.pid;

  const updatedPermi = { ...DUMMY_PLACES_EARLY_LEAVE.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES_EARLY_LEAVE.findIndex(p => p.id === placeId);
  updatedPermi.status = status;

  DUMMY_PLACES_EARLY_LEAVE[placeIndex] = updatedPermi;

  res.status(200).json({ place: updatedPermi });
};


// to delete permi
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES_EARLY_LEAVE.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id.', 404);
  }
  DUMMY_PLACES_EARLY_LEAVE = DUMMY_PLACES_EARLY_LEAVE.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};



exports.getPlaceById = getSocietyPermiById;

exports.getAllSocietyPermi = getAllSocietyPermi;
exports.getAllEarlyLeavePermi = getAllEarlyLeavePermi;
exports.getAllLibraryPermi = getAllLibraryPermi;

exports.getPlacesByUserId = getPlacesByUserId;

exports.createPermiEarlyLeave = createPermiEarlyLeave;
exports.createPermiSociety = createPermiSociety;
exports.createPermiLibrary = createPermiLibrary;

exports.updatePermiSociety = updatePermiSociety;
exports.updatePermiLibrary =updatePermiLibrary;
exports.updatePermiearly = updatePermiearly;

exports.deletePlace = deletePlace;
exports.getAllPermi = getAllPermi ;




// with mongodb
// const getSocietyPermiById = async (req, res, next) => {
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Societypermi.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       'Something went wrong, could not find a place.',
//       500
//     );
//     return next(error);
//   }

//   if (!place) {
//     const error = new HttpError(
//       'Could not find a place for the provided id.',
//       404
//     );
//     return next(error);
//   }

//   res.json({ place: place.toObject({ getters: true }) });
// };


// creating permi with database
// const createPermiSociety = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }
//   const { room_num, intime, outtime, society_name, status, creator } = req.body;
//   const createdPermi = new Societypermi({
//     room_num,
//     intime,
//     outtime,
//     society_name,
//     status,
//     creator
//   });

//    try { 
//     await createdPermi.save();;
//   } catch (err) {
//     const error = new HttpError(
//       'Creating place failed, please try again.',
//       500
//     );
//     return next(error);
//   }

//   res.status(201).json({ place: createdPermi });
// };