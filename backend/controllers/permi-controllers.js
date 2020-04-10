const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Societypermi = require('../models/society-model');
const Librarypermi = require('../models/library-model');
const Earlypermi = require('../models/early-model');
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
// const getSocietyPermiById = (req, res, next) => {
//   const placeId = req.params.pid; // { pid: 'p1' }

//   const place = DUMMY_PERMI_SOCIETY.find(p => {
//     return p.id === placeId;
//   });

//   if (!place) {
//     throw new HttpError('Could not find a place for the provided id.', 404);
//   }
//   res.json({ place });
// };
// with mongodb
const getSocietyPermiById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Societypermi.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      'Could not find a place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};


//display all society requests(for caretaker)
// const getAllSocietyPermi = (req, res, next) => {
//  res.json({All_society_permis :  DUMMY_PERMI_SOCIETY });
// };
const getAllSocietyPermi = async (req, res, next) => {
  let permis;
  try {
    permis = await Societypermi.find({}, '-category');
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({All_society_permis: permis.map(user => user.toObject({ getters: true }))});
};


//display all early leave requests(for caretaker)
// const getAllEarlyLeavePermi = (req, res, next) => {
//  res.json({ All_early_leave_permis :  DUMMY_PLACES_EARLY_LEAVE });
// };
const getAllEarlyLeavePermi = async(req, res, next) => {
   let permis;
  try {
    permis = await Earlypermi.find({}, '-category');
  } catch (err) {
    const error = new HttpError(
      'Fetching all early leave permis failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({All_early_leave_permis: permis.map(user => user.toObject({ getters: true }))});
};


//display all library requests(for caretaker)
// const getAllLibraryPermi = (req, res, next) => {
//  res.json({ All_library_permis : DUMMY_PERMI_LIBRARY });
// };
const getAllLibraryPermi = async(req, res, next) => {
   let permis;
  try {
    permis = await Librarypermi.find({}, '-category');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({All_early_leave_permis: permis.map(user => user.toObject({ getters: true }))});
};



//to get all the permis made by a particular user
// const getPlacesByUserId = (req, res, next) => {
//   const userId = req.params.uid;

//   let permis = DUMMY_PERMI_SOCIETY.filter(p => {
//     return p.creator === userId;
//   });
//   permislib = DUMMY_PERMI_LIBRARY.filter(p => {
//     return p.creator === userId;
//   });
//   permisear =  DUMMY_PLACES_EARLY_LEAVE.filter(p => {
//     return p.creator === userId;
//   });

//   permis = permis.concat(permislib).concat(permisear);
//   if (!permis || permis.length === 0) {
//     return next(
//       new HttpError('Could not find places for the provided user id.', 404)
//     );
//   }

//   res.json({ permis });
// };
//with mongo db
const getPermisByUserId = async (req, res, next) => {
  const userId = req.params.uid;

   let permislib;
  try {
    permislib = await Librarypermi.find({ creator : userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500
    );
    return next(error);
  }
   let permissoc;
  try {
    permissoc = await Societypermi.find({ creator : userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500
    );
    return next(error);
  }
   let permisear;
  try {
    permisear = await Earlypermi.find({ creator : userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500
    );
    return next(error);
  }

  permislib= permislib.concat(permissoc).concat(permisear);
  res.json({ All_permis_by_user : permislib.map(user => user.toObject({ getters: true }))});
};





//to get all the permis made by all users (for caretaker)
const getAllPermi = async (req, res, next) => {

   let permislib;
  try {
    permislib = await Librarypermi.find({} ,'-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500
    );
    return next(error);
  }
   let permissoc;
  try {
    permissoc = await Societypermi.find({} ,'-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all society permis failed, please try again later.',
      500
    );
    return next(error);
  }
   let permisear;
  try {
    permisear = await Earlypermi.find({} ,'-');
  } catch (err) {
    const error = new HttpError(
      'Fetching all library permis failed, please try again later.',
      500
    );
    return next(error);
  }

  permislib= permislib.concat(permissoc).concat(permisear);
  res.json({ All_permis_by_user : permislib.map(user => user.toObject({ getters: true }))});
};






//creation of permis early leave
// const createPermiEarlyLeave = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }

//   const { room_num, destination, intime, creator } = req.body;

  
//   const createdPermi = {
//     id: uuid(),
//     room_num,
//     destination,
//     intime,
//     creator
//   };

//   DUMMY_PLACES_EARLY_LEAVE.push(createdPermi); 

//   res.status(201).json({ place: createdPermi });
// }; 
//create permi with mongodb
const createPermiEarlyLeave = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, destination, intime, creator } = req.body;
  const createdPermi = new Earlypermi({
    room_num,
    destination,
    intime,
    creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('finding creator failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try {
    
    await createdPermi.save();
    user.places.push(createdPermi);
    await user.save();
  
  } catch (err) {
    const error = new HttpError(
      'Creating permi failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPermi });
};




//create society permi without database
// const createPermiSociety = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }
//   const { room_num, intime, outtime, society_name, status, creator } = req.body;
//   const createdPermi = {
//     id: uuid(),
//     room_num,
//     intime,
//     outtime,
//     society_name,
//     status,
//     creator
//   };

//   DUMMY_PERMI_SOCIETY.push(createdPermi);

//   res.status(201).json({ place: createdPermi });
// };

// creating permi with database
const createPermiSociety = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, intime, outtime, society_name, status, creator } = req.body;
  const createdPermi = new Societypermi({
    room_num,
    intime,
    outtime,
    society_name,
    status,
    creator
  });
 let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('finding creator failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try {
    
    await createdPermi.save();
    user.places.push(createdPermi);
    await user.save();
  
  } catch (err) {
    const error = new HttpError(
      'Creating permi failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPermi });
};




//create permi for library
// const createPermiLibrary = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }
//   const { room_num, intime, outtime,status,creator } = req.body;
//   const createdPermi = {
//     id: uuid(),
//     room_num,
//     intime,
//     outtime,
//     status,
//     creator
//   };

//   DUMMY_PERMI_LIBRARY.push(createdPermi);

//   res.status(201).json({ place: createdPermi });
// };
//creating library permi with database
const createPermiLibrary = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, intime, outtime,status,creator } = req.body;

  const createdPermi = new Librarypermi({
    room_num,
    intime,
    outtime,
    status,
    creator
  });
 let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError('finding creator failed', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(user);

  try {
    
    await createdPermi.save();
    user.places.push(createdPermi);
    await user.save();
  
  } catch (err) {
    const error = new HttpError(
      'Creating permi failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPermi });
};





// update status pending to done (society) without db
// const updatePermiSociety = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }

//   const { status } = req.body;
//   const placeId = req.params.pid;

//   const updatedPermi = { ...DUMMY_PERMI_SOCIETY.find(p => p.id === placeId) };
//   const placeIndex = DUMMY_PERMI_SOCIETY.findIndex(p => p.id === placeId);
//   updatedPermi.status = status;

//   DUMMY_PERMI_SOCIETY[placeIndex] = updatedPermi;

//   res.status(200).json({ place: updatedPermi });
// };
//update society permi status with mongodb
const updatePermiSociety = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const permiId = req.params.pid;

  let permi;
  try {
    permi = await Societypermi.findById(permiId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  permi.status = status;
  try {
    await permi.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  res.status(200).json({ permi: permi.toObject({ getters: true }) });
};




// update status pending to done (library)
// const updatePermiLibrary = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }

//   const { status } = req.body;
//   const placeId = req.params.pid;

//   const updatedPermi = { ...DUMMY_PERMI_LIBRARY.find(p => p.id === placeId) };
//   const placeIndex = DUMMY_PERMI_LIBRARY.findIndex(p => p.id === placeId);
//   updatedPermi.status = status;

//   DUMMY_PERMI_LIBRARY[placeIndex] = updatedPermi;

//   res.status(200).json({ place: updatedPermi });
// };
//pdate status with mongodb
const updatePermiLibrary = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const permiId = req.params.pid;

  let permi;
  try {
    permi = await Librarypermi.findById(permiId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  permi.status = status;
  try {
    await permi.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  res.status(200).json({ permi: permi.toObject({ getters: true }) });
};




// update status pending to done (early leave)
// const updatePermiearly = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     throw new HttpError('Invalid inputs passed, please check your data.', 422);
//   }

//   const { status } = req.body;
//   const placeId = req.params.pid;

//   const updatedPermi = { ...DUMMY_PLACES_EARLY_LEAVE.find(p => p.id === placeId) };
//   const placeIndex = DUMMY_PLACES_EARLY_LEAVE.findIndex(p => p.id === placeId);
//   updatedPermi.status = status;

//   DUMMY_PLACES_EARLY_LEAVE[placeIndex] = updatedPermi;

//   res.status(200).json({ place: updatedPermi });
// };
const updatePermiearly = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const permiId = req.params.pid;

  let permi;
  try {
    permi = await Earlypermi.findById(permiId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  permi.status = status;
  try {
    await permi.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update status.',
      500
    );
    return next(error);
  }
  res.status(200).json({ permi: permi.toObject({ getters: true }) });
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



exports.getSocietyPermiById = getSocietyPermiById;

exports.getAllSocietyPermi = getAllSocietyPermi;
exports.getAllEarlyLeavePermi = getAllEarlyLeavePermi;
exports.getAllLibraryPermi = getAllLibraryPermi;

exports.getPermisByUserId = getPermisByUserId;

exports.createPermiEarlyLeave = createPermiEarlyLeave;
exports.createPermiSociety = createPermiSociety;
exports.createPermiLibrary = createPermiLibrary;

exports.updatePermiSociety = updatePermiSociety;
exports.updatePermiLibrary =updatePermiLibrary;
exports.updatePermiearly = updatePermiearly;

exports.deletePlace = deletePlace;
exports.getAllPermi = getAllPermi ;






