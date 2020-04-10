const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose=require('mongoose');
const HttpError = require('../models/http-error');
//const Societypermi = require('../models/Societypermi-model');
const Users = require('../models/user-model');
const Societypermi= require('../models/Societypermi-model');
const EarlyLeavepermi= require('../models/EarlyLeavepermi-model');
const Librarypermi= require('../models/Librarypermi-model');
const LateEntrypermi= require('../models/LateEntrypermi-model');
/*let DUMMY_PLACES_EARLY_LEAVE = [
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
    society_name : 'urja' , 
    creator: 'u1',
    status : 'pending'
    // have to make status pending by default
  }
];


let DUMMY_PERMI_LIBRARY = [
  {
    id: 'p1',
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
  //this is used when we need to find the details of a particular student
  /*const personId = req.params.pid; // { pid: 'p1' }

  const person = DUMMY_PERMI_SOCIETY.find(p => {
    return p.id === personId;
  });

  if (!person) {
    throw new HttpError('Could not find a place for the provided id.', 404);
  }
  res.json({ person });}*/
  


//display all society requests
const getAllSocietyPermi = async (req, res, next) => {
  let society;
  try{
    society=await Societypermi.find({});
  }catch(err){
    const error=new HttpError('Not able to get the data,Please try Again',500);
    return next(error);
  };
  if(!society || society.length==0)
  {
    const error=new HttpError('Cannot find any data',404);
    return next(error);
  };

  res.json({society: society.map(society=>society.toObject({getters:true}))});
};


//display all early leave requests
const getAllEarlyLeavePermi = async (req, res, next) => {
  let early;
  try{
    early=await EarlyLeavepermi.find({});
  }catch(err){
    throw new HttpError('Not able to get the data.please Try Again',500);

  }
  if(!early || early.length===0)
  {
    throw new HttpError('Cannot find the data',404);
  }

  res.json({early_leave: early.map(early=>early.toObject({getters:true}))});
};


//display all library requests
const getAllLibraryPermi = async (req, res, next) => {
  let library;
  try{
    library=await Librarypermi.find({});
  }catch(err){
    throw new HttpError('Not able to get the data.please Try Again',500);

  }
  if(!library || library.length===0)
  {
    throw new HttpError('Cannot find the data',404);
  }

  res.json({Library: library.map(library=>library.toObject({getters:true}))});
};

//display all lateentry requests
const getAllLateEntryPermi = async (req,res, next) => {
  let late;
  try{
    late=await LateEntrypermi.find({});
  }catch(err){
    return next(new HttpError('Not able to get the data.please Try Again',500));

  }
  if(!late || late.length===0)
  {
    return next(new HttpError('Cannot find the data',404));
  }

  res.json({Late_entry: late.map(late=>late.toObject({getters:true}))});
};


//to get all the permis list
const getAllPermi = async (req,res,next)=>{
  let permis;
  let late;
  let early;
  let library;
  try{
    permis=await Societypermi.find({});
    permis=permis.map(permis=>permis.toObject({getters:true}));
    library= await Librarypermi.find({});
    library=library.map(library=>library.toObject({getters:true}));
    permis=permis.concat(library);
  }catch(err){
    throw new HttpError('Not able to get the data,Please try again',500);
  }
   if(!permis || permis.length===0)
   {
     throw new HttpError('Cannot find the data',404);
   }
  
  res.json({permis: permis.map(permis=>permis.toObject)});
};



//to get all the permis made by a particular user
/*const getPlacesByUserId = (req, res, next) => {
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
/*const getAllPermi = (req, res, next) => {

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

*/

//creation of permis early leave
const createPermiEarlyLeave = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { room_num, destination, outtime, status, date} = req.body;

  
  const createdEarlyPermi = new EarlyLeavepermi({
    room_num,
    destination,
    outtime,
    status,
    date,
    creator
  });

  let user;
  try{
  user=await Users.findById(creator);
}catch(err)
{
  return next(new HttpError('Creating Permi Failed.Please Try Again.',500));
}

if(!user)
{
  return next(new HttpError('Could Not fid user for the provided id',404));
}
  try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdEarlyPermi.save({session:sess});
    Users.Permis.push(createdEarlyPermi);
    await Users.save({session:sess});
    sess.commitTransaction();
   
  }catch(err){
     const error=new HttpError(
       'Creating request for Early Leave Failed.Please Try Again.',500);
       return next(error);
  }

  res.status(201).json({ Early_Leave: createdEarlyPermi });
}; 


//create society permi with database
const createPermiSociety = async (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const {room_num, intime, outtime, society_name, status, date,creator}=req.body;
  const createdPermiSociety=new Societypermi({
  room_num,
  intime,
  outtime,
  society_name,
  status,
  date,
  creator
});

let user;
  try{
  user=await Users.findById(creator);
}catch(err)
{
  return next(new HttpError('Creating Permi Failed.Please Try Again.',500));
}

if(!user)
{
  return next(new HttpError('Could Not fid user for the provided id',404));
}
  try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdEarlyPermi.save({session:sess});
    Users.Permis.push(createdEarlyPermi);
    await Users.save({session:sess});
    sess.commitTransaction();
  } catch(err) {
    const error=new HttpError(
      'Creating request for society failed.Please try again.',500);
    return next(error);
  }
  res.status(201).json({ place: createdPermiSociety });
};


//create permi for library
const createPermiLibrary = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, intime, outtime,status,date,creator } = req.body;
  const createdPermiLibrary = new Librarypermi({
    room_num,
    intime,
    outtime,
    status,
    date,
    creator
  });

  let user;
  try{
  user=await Users.findById(creator);
}catch(err)
{
  return next(new HttpError('Creating Permi Failed.Please Try Again.',500));
}

if(!user)
{
  return next(new HttpError('Could Not fid user for the provided id',404));
}
  try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdEarlyPermi.save({session:sess});
    Users.Permis.push(createdEarlyPermi);
    await Users.save({session:sess});
    sess.commitTransaction();
  }catch(err){
    const error=new HttpError(
      'Creating request for Library failed.Please try again.',500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPermiLibrary });
};

//creating permis for lateentry
const createPermiLateEntry = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { room_num, destination, intime, outtime,status,date,creator } = req.body;
  const createdPermiLateEntry = new LateEntrypermi({
    room_num,
    destination,
    outtime,
    intime,
    status,
    date,
    creator
  });
  let user;
  try{
  user=await Users.findById(creator);
}catch(err)
{
  return next(new HttpError('Creating Permi Failed.Please Try Again.',500));
}

if(!user)
{
  return next(new HttpError('Could Not fid user for the provided id',404));
}
  try{
    const sess=await mongoose.startSession();
    sess.startTransaction();
    await createdEarlyPermi.save({session:sess});
    Users.Permis.push(createdEarlyPermi);
    await Users.save({session:sess});
    sess.commitTransaction();
  }catch(err){
    const error=new HttpError(
      'Creating request for Late Entry failed.Please try again.',500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPermiLateEntry });
};


// update status pending to done (society) 
const updatePermiSociety = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status }=req.body;
  const userid=req.params.uid;
  let id;
  try{
    id=await Societypermi.findById(userid);
  }catch(err)
  {
    return next(new HttpError('Could not update. Please try Again',500));
  }
  //console.log(id);
  id.status=status;
  //console.log(id);
  try {
    await id.save();
  } catch (err) {
    const error=new HttpError('Could Not Update.Please Try Againu.',500);
    return next(error);
  }

  res.status(200).json({ society: id.toObject({getters:true}) });  
};




// update status pending to done (library)
const updatePermiLibrary = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const userid = req.params.uid;
  let idlib;
  try{
    idlib=await Librarypermi.findById(userid);
  }catch(err)
  {
     return next(new HttpError('Could Not Update.Please Try Again',422));
  }

  idlib.status=status;
  try{
     await idlib.save();
  }catch(err){
    return next(new HttpError('Could Not Update. Please Try Again.',422));
  }

  res.status(200).json({ library: idlib.toObject({getters:true}) });
};



// update status pending to done (early leave)
const updatePermiearly = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { status } = req.body;
  const userid = req.params.uid;
  let id;
  try{
    id=await EarlyLeavepermi.findById(userid);
  }catch(err)
  {
     return next(new HttpError('Could Not Update.Please Try Again',422));
  }

  id.status=status;
  try{
     await id.save();
  }catch(err){
    return next(new HttpError('Could Not Update. Please Try Again.',422));
  }

  res.status(200).json({ Early_Leave: id.toObject({getters:true}) });
};

const updatePermiLate=async (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { status } = req.body;
  const userid = req.params.uid;
  let id;
  try{
    id=await LateEntrypermi.findById(userid);
  }catch(err)
  {
     return next(new HttpError('Could Not Update.Please Try Again',422));
  }

  id.status=status;
  try{
     await id.save();
  }catch(err){
    return next(new HttpError('Could Not Update. Please Try Again.',422));
  }

  res.status(200).json({ late_Entry: id.toObject({getters:true}) });

}

 const deletePlaceSociety = async(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return next(new HttpError('Invalid inputs passed.Please Check Your Data',422));
  }

  let userid=req.params.uid;
  let id;
  try{
     id= await Societypermi.findById(userid);
  }catch(err)
  {
    return next(new HttpError('Could Not delete the data.Please Try Again.,500'));
  }

  try{
    await id.remove();
  }catch(err)
  {
    return next(new HttpError('Could Not Delete the data.Please Try Again.',500));
  }

  res.status(200).json({message: 'Data Deleted'});
}

//exports.getPlaceById = getSocietyPermiById;

exports.getAllSocietyPermi = getAllSocietyPermi;
exports.getAllEarlyLeavePermi = getAllEarlyLeavePermi;
exports.getAllLibraryPermi = getAllLibraryPermi;
exports.getAllLateEntryPermi=getAllLateEntryPermi;
//exports.getAllPermi=getAllPermi;

//exports.getPlacesByUserId = getPlacesByUserId;

exports.createPermiEarlyLeave = createPermiEarlyLeave;
exports.createPermiSociety = createPermiSociety;
exports.createPermiLibrary = createPermiLibrary;
exports.createPermiLateEntry=createPermiLateEntry;

exports.updatePermiSociety = updatePermiSociety;
exports.updatePermiLibrary =updatePermiLibrary;
exports.updatePermiearly = updatePermiearly;
exports.updatePermiLate=updatePermiLate;

exports.deletePlaceSociety = deletePlaceSociety;




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