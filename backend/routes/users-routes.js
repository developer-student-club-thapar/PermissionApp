const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('Name').not().isEmpty(),
    check('Email_id').normalizeEmail().isEmail(),
    check('Password').isLength({ min: 6 }),
  ],
  usersController.signup,
);

router.post('/login', usersController.login);

// route to change Password
router.patch(
  '/changepassword/:uid',
  [
    check('prevPassword').not().isEmpty(),
    check('newPassword').not().isEmpty(),
    check('newPassword').isLength({ min: 6 }),
  ],
  usersController.changepassword,
);

module.exports = router;
