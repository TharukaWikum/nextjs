
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    postalCode: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    postalCode: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessages({
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      postalCode: '',
    });
  };

  const handleSave = () => {
    // Validate form data
    const validationErrors = {};
    let isValid = true;

    // Check if fields are empty
    for (const key in formData) {
      if (!formData[key]) {
        validationErrors[key] = 'This field is required';
        isValid = false;
      }
    }

    // Validate first name and last name (letters only)
    const nameRegex = /^[A-Za-z]+$/;
    if (!formData.firstName.match(nameRegex)) {
      validationErrors.firstName = 'First name must contain letters only';
      isValid = false;
    }
    if (!formData.lastName.match(nameRegex)) {
      validationErrors.lastName = 'Last name must contain letters only';
      isValid = false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      validationErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!isValid) {
      setErrorMessages(validationErrors);
      return;
    }

    // Send a POST request to your backend API to create a new user
    axios
      .post('http://localhost:3500/users', formData)
      .then((response) => {
        console.log('User created:', response.data);
        // Close the dialog
        setOpen(false);
        // Clear the form data
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          postalCode: '',
        });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessages({ ...errorMessages, email: error.response.data.message });
        } else {
          console.error('Error creating user:', error);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessages({
      ...errorMessages,
      [name]: '', // Clear validation error message when user types
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the user information:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First Name"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            error={Boolean(errorMessages.firstName)}
            helperText={errorMessages.firstName}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            fullWidth
            value={formData.lastName}
            onChange={handleChange}
            error={Boolean(errorMessages.lastName)}
            helperText={errorMessages.lastName}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errorMessages.email)}
            helperText={errorMessages.email}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              margin="normal"
              name="city"
              label="City"
              fullWidth
              value={formData.city}
              onChange={handleChange}
              style={{ paddingRight: '5px' }}
            />
            <TextField
              margin="normal"
              name="postalCode"
              label="Postal Code"
              fullWidth
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
