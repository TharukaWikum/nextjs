const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Create a new user
const createNewUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, city, postalCode } = req.body;

    try {
        // Check if the user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'A user with this email already exists.' });
            return;
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            city,
            postalCode,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        
        if (users.length === 0) {
            // If no users found, send a custom message
            res.status(200).json({ message: 'No users found.' });
        } else {
            // If users are found, send the users data
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});



module.exports = {
    createNewUser,
    getAllUsers,
};
