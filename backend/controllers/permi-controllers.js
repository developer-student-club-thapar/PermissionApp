const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Users = require("../models/user-model");
const Societypermi = require("../models/Societypermi-model");
const EarlyLeavepermi = require("../models/EarlyLeavepermi-model");
const Librarypermi = require("../models/Librarypermi-model");
const LateEntrypermi = require("../models/LateEntrypermi-model");

//display all society requests
const getAllSocietyPermi = async (req, res, next) => {
	let society;
	try {
		society = await Societypermi.find({}, "-category");
	} catch (err) {
		const error = new HttpError(
			"Not able to get the data,Please try Again",
			500
		);
		return next(error);
	}
	if (!society || society.length == 0) {
		const error = new HttpError("Cannot find any data", 404);
		return next(error);
	}

	res.json({
		society: society.map((society) => society.toObject({ getters: true })),
	});
};

//display all early leave requests
const getAllEarlyLeavePermi = async (req, res, next) => {
	let early;
	try {
		early = await EarlyLeavepermi.find({}, "-category");
	} catch (err) {
		return next(
			new HttpError("Not able to get the data.please Try Again", 500)
		);
	}
	if (!early || early.length === 0) {
		throw new HttpError("Cannot find the data", 404);
	}

	res.json({
		early_leave: early.map((early) => early.toObject({ getters: true })),
	});
};

//display all library requests
const getAllLibraryPermi = async (req, res, next) => {
	let library;
	try {
		library = await Librarypermi.find({}, "-category");
	} catch (err) {
		return next(
			new HttpError("Not able to get the data.please Try Again", 500)
		);
	}
	if (!library || library.length === 0) {
		throw new HttpError("Cannot find the data", 404);
	}

	res.json({
		Library: library.map((library) => library.toObject({ getters: true })),
	});
};

//display all lateentry requests
const getAllLateEntryPermi = async (req, res, next) => {
	let late;
	try {
		late = await LateEntrypermi.find({}, "-category");
	} catch (err) {
		return next(
			new HttpError("Not able to get the data.please Try Again", 500)
		);
	}
	if (!late || late.length === 0) {
		return next(new HttpError("Cannot find the data", 404));
	}

	res.json({
		Late_entry: late.map((late) => late.toObject({ getters: true })),
	});
};

//to get all the permis made by a particular user
const getPermisByUserId = async (req, res, next) => {
	const userId = req.params.uid;

	let permislib;
	try {
		permislib = await Librarypermi.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permissoc;
	try {
		permissoc = await Societypermi.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching all society permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permisear;
	try {
		permisear = await EarlyLeavepermi.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permilate;
	try {
		permilate = await LateEntrypermi.find({ creator: userId });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}

	permislib = permislib.concat(permissoc).concat(permisear).concat(permilate);
	permislib.sort((a, b) => (a._id > b._id ? -1 : 1));

	res.json({
		All_permis_by_user: permislib.map((late) =>
			late.toObject({ getters: true })
		),
	});
};

const getAllPermi = async (req, res, next) => {
	let permis;
	try {
		permis = await Librarypermi.find({}, "-");
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permissoc;
	try {
		permissoc = await Societypermi.find({}, "-");
	} catch (err) {
		const error = new HttpError(
			"Fetching all society permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permisear;
	try {
		permisear = await EarlyLeavepermi.find({}, "-");
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}

	let permislate;
	try {
		permislate = await LateEntrypermi.find({}, "-");
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}

	permis = permis.concat(permissoc).concat(permisear).concat(permislate);
	permis.sort((a, b) => (a._id > b._id ? 1 : -1));
	res.json({
		All_permis_by_user: permis.map((permi) =>
			permi.toObject({ getters: true })
		),
	});
};

const getAllPermiForCaretaker = async (req, res, next) => {
	let permis;
	try {
		permis = await Librarypermi.find({ status: "pending" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permissoc;
	try {
		permissoc = await Societypermi.find({ status: "pending" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all society permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permisear;
	try {
		permisear = await EarlyLeavepermi.find({ status: "pending" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permislate;
	try {
		permislate = await LateEntrypermi.find({ status: "pending" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}

	permis = permis.concat(permissoc).concat(permisear).concat(permislate);
	permis.sort((a, b) => (a._id > b._id ? 1 : -1));
	res.json({
		All_permis_by_user: permis.map((permi) =>
			permi.toObject({ getters: true })
		),
	});
};

//Previous accepetd requests by warden/caretaker.
const getAcceptedPermiForCaretaker = async (req, res, next) => {
	let permis;
	try {
		permis = await Librarypermi.find({ status: "accepted" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permissoc;
	try {
		permissoc = await Societypermi.find({ status: "accepted" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all society permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permisear;
	try {
		permisear = await EarlyLeavepermi.find({ status: "accepted" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}
	let permislate;
	try {
		permislate = await LateEntrypermi.find({ status: "accepted" });
	} catch (err) {
		const error = new HttpError(
			"Fetching all library permis failed, please try again later.",
			500
		);
		return next(error);
	}

	permis = permis.concat(permissoc).concat(permisear).concat(permislate);
	permis.sort((a, b) => (a._id > b._id ? 1 : -1));
	res.json({
		All_permis_by_user: permis.map((permi) =>
			permi.toObject({ getters: true })
		),
	});
};

//creation of permis early leave
const createPermiEarlyLeave = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}

	const { room_num, destination, outtime, date, creator } = req.body;

	const createdEarlyPermi = new EarlyLeavepermi({
		room_num,
		destination,
		outtime,
		date,
		creator,
	});

	let user;
	try {
		user = await Users.findById(creator);
	} catch (err) {
		return next(new HttpError("Creating Permi Failed.Please Try Again.", 500));
	}

	if (!user) {
		return next(new HttpError("Could Not fid user for the provided id", 404));
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdEarlyPermi.save({ session: sess });
		user.Permis.push(createdEarlyPermi);
		await user.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Creating request for Early Leave Failed.Please Try Again.",
			500
		);
		return next(error);
	}

	res.status(201).json({ Early_Leave: createdEarlyPermi });
};

//create society permi with database
const createPermiSociety = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	const { room_num, intime, outtime, society_name, date, creator } = req.body;
	const createdPermiSociety = new Societypermi({
		room_num,
		intime,
		outtime,
		society_name,
		date,
		creator,
	});

	let user;
	try {
		user = await Users.findById(creator);
	} catch (err) {
		return next(new HttpError("Creating Permi Failed.Please Try Again.", 500));
	}

	if (!user) {
		return next(new HttpError("Could Not find user for the provided id", 404));
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPermiSociety.save({ session: sess });
		user.Permis.push(createdPermiSociety);
		await user.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Creating request for society failed.Please try again.",
			500
		);
		return next(error);
	}
	res.status(201).json({ place: createdPermiSociety });
};

//create permi for library
const createPermiLibrary = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	const { room_num, intime, outtime, date, creator } = req.body;
	const createdPermiLibrary = new Librarypermi({
		room_num,
		intime,
		outtime,
		date,
		creator,
	});

	let user;
	try {
		user = await Users.findById(creator);
	} catch (err) {
		return next(new HttpError("Creating Permi Failed.Please Try Again.", 500));
	}

	if (!user) {
		return next(new HttpError("Could Not fid user for the provided id", 404));
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPermiLibrary.save({ session: sess });
		user.Permis.push(createdPermiLibrary);
		await user.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Creating request for Library failed.Please try again.",
			500
		);
		return next(error);
	}

	res.status(201).json({ place: createdPermiLibrary });
};

//creating permis for lateentry
const createPermiLateEntry = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}
	const { room_num, destination, intime, date, creator } = req.body;
	const createdPermiLateEntry = new LateEntrypermi({
		room_num,
		destination,

		intime,
		date,
		creator,
	});
	let user;
	try {
		user = await Users.findById(creator);
	} catch (err) {
		return next(new HttpError("Creating Permi Failed.Please Try Again.", 500));
	}

	if (!user) {
		return next(new HttpError("Could Not fid user for the provided id", 404));
	}
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdPermiLateEntry.save({ session: sess });
		user.Permis.push(createdPermiLateEntry);
		await user.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			"Creating request for Late Entry failed.Please try again.",
			500
		);
		return next(error);
	}

	res.status(201).json({ place: createdPermiLateEntry });
};

// update status pending to done (society)
const updatePermiSociety = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}

	const { status } = req.body;
	const userid = req.params.uid;
	let id;
	try {
		id = await Societypermi.findById(userid);
	} catch (err) {
		return next(new HttpError("Could not update. Please try Again", 500));
	}
	//console.log(id);
	id.status = status;
	//console.log(id);
	try {
		await id.save();
	} catch (err) {
		const error = new HttpError("Could Not Update.Please Try Againu.", 500);
		return next(error);
	}

	res.status(200).json({ society: id.toObject({ getters: true }) });
};

// update status pending to done (library)
const updatePermiLibrary = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}

	const { status } = req.body;
	const userid = req.params.uid;
	let idlib;
	try {
		idlib = await Librarypermi.findById(userid);
	} catch (err) {
		return next(new HttpError("Could Not Update.Please Try Again", 422));
	}

	idlib.status = status;
	try {
		await idlib.save();
	} catch (err) {
		return next(new HttpError("Could Not Update. Please Try Again.", 422));
	}

	res.status(200).json({ library: idlib.toObject({ getters: true }) });
};

// update status pending to done (early leave)
const updatePermiearly = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}

	const { status } = req.body;
	const userid = req.params.uid;
	let id;
	try {
		id = await EarlyLeavepermi.findById(userid);
	} catch (err) {
		return next(new HttpError("Could Not Update.Please Try Again", 422));
	}

	id.status = status;
	try {
		await id.save();
	} catch (err) {
		return next(new HttpError("Could Not Update. Please Try Again.", 422));
	}

	res.status(200).json({ Early_Leave: id.toObject({ getters: true }) });
};

const updatePermiLate = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, please check your data.", 422)
		);
	}

	const { status } = req.body;
	const userid = req.params.uid;
	let id;
	try {
		id = await LateEntrypermi.findById(userid);
	} catch (err) {
		return next(new HttpError("Could Not Update.Please Try Again", 422));
	}

	id.status = status;
	try {
		await id.save();
	} catch (err) {
		return next(new HttpError("Could Not Update. Please Try Again.", 422));
	}

	res.status(200).json({ late_Entry: id.toObject({ getters: true }) });
};

const deleteUserSociety = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed.Please Check Your Data", 422)
		);
	}

	let userid = req.params.uid;
	let id;
	try {
		id = await Societypermi.findById(userid).populate("creator");
	} catch (err) {
		return next(
			new HttpError("Could Not delete the data.Please Try Again.", 500)
		);
	}

	if (!id) {
		return next(new HttpError("Could not find data for this id", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.commitTransaction();
		await id.remove({ session: sess });
		await id.creator.Permis.pull(id);
		await id.creator.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		return next(
			new HttpError("Could Not Delete the data.Please Try Again.", 500)
		);
	}

	res.status(200).json({ message: "Data Deleted" });
};

const deleteUserLibrary = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed.Please Check Your Data", 500)
		);
	}

	let userid = req.params.uid;
	let user;
	try {
		user = await Librarypermi.findById(userid).populate("creator");
	} catch (error) {
		return next(
			new HttpError("Could Not delete the data.Please Try Again.", 500)
		);
	}
	if (!user) {
		return next(new HttpError("Could not find data for this id", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.commitTransaction();
		await user.remove({ session: sess });
		await user.creator.Permis.pull(user);
		await user.creator.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		return next(
			new HttpError("Could Not Delete the data.Please Try Again.", 500)
		);
	}

	res.status(200).json({ message: "Deleted Data" });
};

const deleteUserLate = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed.Please Check Your Data", 500)
		);
	}

	let userid = req.params.uid;
	let user;
	try {
		user = await LateEntrypermi.findById(userid).populate("creator");
	} catch (error) {
		return next(
			new HttpError("Could Not delete the data.Please Try Again.", 500)
		);
	}

	if (!user) {
		return next(new HttpError("Could not find data for this id", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.commitTransaction();
		await user.remove({ session: sess });
		await user.creator.Permis.pull(user);
		await user.creator.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		return next(
			new HttpError("Could Not Delete the data.Please Try Again.", 500)
		);
	}

	res.status(200).json({ message: "Deleted Data" });
};

const deleteUserEarly = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed.Please Check Your Data", 500)
		);
	}

	let userid = req.params.uid;
	let user;
	try {
		user = await EarlyLeavepermi.findById(userid).populate("creator");
	} catch (error) {
		return next(
			new HttpError("Could Not delete the data.Please Try Again.", 500)
		);
	}

	if (!user) {
		return next(new HttpError("Could not find data for this id", 404));
	}

	try {
		const sess = await mongoose.startSession();
		sess.commitTransaction();
		await user.remove({ session: sess });
		await user.creator.Permis.pull(user);
		await user.creator.save({ session: sess });
		sess.commitTransaction();
	} catch (err) {
		return next(
			new HttpError("Could Not Delete the data.Please Try Again.", 500)
		);
	}

	res.status(200).json({ message: "Deleted Data" });
};

//exports.getPlaceById = getSocietyPermiById;

exports.getAllSocietyPermi = getAllSocietyPermi;
exports.getAllEarlyLeavePermi = getAllEarlyLeavePermi;
exports.getAllLibraryPermi = getAllLibraryPermi;
exports.getAllLateEntryPermi = getAllLateEntryPermi;
exports.getAllPermi = getAllPermi;
exports.getPermisByUserId = getPermisByUserId;
exports.getAllPermiForCaretaker = getAllPermiForCaretaker;
exports.getAcceptedPermiForCaretaker = getAcceptedPermiForCaretaker;

exports.createPermiEarlyLeave = createPermiEarlyLeave;
exports.createPermiSociety = createPermiSociety;
exports.createPermiLibrary = createPermiLibrary;
exports.createPermiLateEntry = createPermiLateEntry;

exports.updatePermiSociety = updatePermiSociety;
exports.updatePermiLibrary = updatePermiLibrary;
exports.updatePermiearly = updatePermiearly;
exports.updatePermiLate = updatePermiLate;

exports.deleteUserSociety = deleteUserSociety;
exports.deleteUserLibrary = deleteUserLibrary;
exports.deleteUserLate = deleteUserLate;
exports.deleteUserEarly = deleteUserEarly;
