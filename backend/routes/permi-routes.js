const express = require('express');
const { check } = require('express-validator');

const permiControllers = require('../controllers/permi-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

//get all permis regarding any type(for caretaker)
router.get('/all/society', permiControllers.getAllSocietyPermi);
router.get('/all/early', permiControllers.getAllEarlyLeavePermi);
router.get('/all/library', permiControllers.getAllLibraryPermi);
router.get('/all/lateentry', permiControllers.getAllLateEntryPermi);
router.get('/all', permiControllers.getAllPermiForCaretaker);
// to get all permi requests made by all users (for caretakers)

//different requests of a particular creator id
//router.get('/:creatorid', permiControllers.getsocietypermisById);
router.get('/verify', permiControllers.verifyEmail);

router.use(checkAuth);
//to get all permi requests made by a particlar user
router.get('/user/:uid', permiControllers.getPermisByUserId);

router.get('/accepted', permiControllers.getAcceptedPermiForCaretaker);
// create early leave request
router.post(
  '/early',
  [
    check('room_num').not().isEmpty(),
    check('destination').not().isEmpty(),
    // check('creator').normalizeEmail().isEmail()
  ],
  permiControllers.createPermiEarlyLeave,
);

// create society request
router.post(
  '/society',
  [
    check('room_num').not().isEmpty(),
    check('intime').not().isEmpty(),
    check('outtime').not().isEmpty(),
    // check('creator').normalizeEmail().isEmail()
  ],
  permiControllers.createPermiSociety,
);

// create library reqest
router.post(
  '/library',
  [
    check('room_num').not().isEmpty(),
    check('intime').not().isEmpty(),
    check('outtime').not().isEmpty(),
    // check('creator').normalizeEmail().isEmail()
  ],
  permiControllers.createPermiLibrary,
);

//updating late entry
router.post(
  '/lateentry',
  [check('room_num').not().isEmpty(), check('destination').not().isEmpty()],
  permiControllers.createPermiLateEntry,
);

//to update status pending to accepted for society
router.patch(
  '/society/:uid',
  [check('status').not().isEmpty()],
  permiControllers.updatePermiSociety,
);

router.patch(
  '/library/:uid',
  [check('status').not().isEmpty()],
  permiControllers.updatePermiLibrary,
);

router.patch(
  '/early/:uid',
  [check('status').not().isEmpty()],
  permiControllers.updatePermiearly,
);

router.patch(
  '/late/:uid',
  [check('status').not().isEmpty()],
  permiControllers.updatePermiLate,
);

router.post('/sendMail/:uid', permiControllers.sendMail);

//to delete any permi if required (by caretaker)
router.delete('/society/:uid', permiControllers.deleteUserSociety);
router.delete('/library/:uid', permiControllers.deleteUserLibrary);
router.delete('/earlyleave/:uid', permiControllers.deleteUserEarly);
router.delete('/lateentry/:uid', permiControllers.deleteUserLate);

module.exports = router;
