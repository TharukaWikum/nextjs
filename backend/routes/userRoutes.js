const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');

// Routes for creating and getting all users
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser);

// Routes for updating, deleting, and getting a user by ID
router.route('/:id')
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
