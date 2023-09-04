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


// Update an existing user by ID
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; // pass the user ID in the URL parameter
    const { firstName, lastName, email, city, postalCode } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // Check if the email is already used by another user (excluding the current user)
        const existingUserWithEmail = await User.findOne({ email, _id: { $ne: userId } });

        if (existingUserWithEmail) {
            res.status(400).json({ message: 'A user with this email already exists.' });
            return;
        }

        // Update user properties
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.city = city;
        user.postalCode = postalCode;

        // Save the updated user to the database
        await user.save();

        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        // Delete the user from the database
        await user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


// Get a user by ID
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id; 

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});





module.exports = {
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
};
