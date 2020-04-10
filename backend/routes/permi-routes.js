const express = require('express');
const { check } = require('express-validator');

const permiControllers = require('../controllers/permi-controllers');

const router = express.Router();


//get all permis regarding any type(for caretaker)
router.get('/all/society', permiControllers.getAllSocietyPermi);
router.get('/all/early', permiControllers.getAllEarlyLeavePermi);
router.get('/all/library', permiControllers.getAllLibraryPermi);
// to get all permi requests made by all users (for caretakers)
router.get('/all', permiControllers.getAllPermi);


//just for testing
router.get('/society/:pid', permiControllers.getSocietyPermiById);


//to get all permi requests made by a particlar user
router.get('/user/:uid', permiControllers.getPermisByUserId);



// create early leave request
router.post(
  '/early',
 [
    check('room_num').not().isEmpty(),
    check('destination').not().isEmpty(),
  ],
  permiControllers.createPermiEarlyLeave
);


// create society request
router.post(
  '/society',
 [
    check('room_num').not().isEmpty(),
    check('intime').not().isEmpty(),
    check('outtime').not().isEmpty(),
  ],
  permiControllers.createPermiSociety
);

// create library reqest
router.post(
  '/library',
 [
    check('room_num').not().isEmpty(),
    check('intime').not().isEmpty(),
    check('outtime').not().isEmpty(),
  ],
  permiControllers.createPermiLibrary
);


//to update status pending to done society
router.patch(
  '/society/:pid',
  [
    check('status').not().isEmpty(),
  ],
  permiControllers.updatePermiSociety
);

router.patch(
  '/library/:pid',
  [
    check('status').not().isEmpty(),
  ],
  permiControllers.updatePermiLibrary
);


router.patch(
  '/early/:pid',
  [
    check('status').not().isEmpty(),
  ],
  permiControllers.updatePermiearly
);


//to delete any permi if required (by caretaker)
router.delete('/:pid', permiControllers.deletePlace);

module.exports = router;
