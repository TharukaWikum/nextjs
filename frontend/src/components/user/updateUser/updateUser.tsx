// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from '@mui/material';

// const UpdateUser = ({ userId, onClose, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     city: '',
//     postalCode: '',
//   });

//   useEffect(() => {
//     // Fetch user data by ID when the component mounts
//     axios.get(`http://localhost:3500/users/${userId}`)
//       .then((response) => {
//         // Once data is fetched, set it in the form data state
//         setFormData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.put(`http://localhost:3500/users/${userId}`, formData);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   return (
//     <Dialog open={true} onClose={onClose}>
//       <DialogTitle>Update User</DialogTitle>
//       <DialogContent>
//         <TextField
//           name="firstName"
//           label="First Name"
//           margin="dense"
//           fullWidth
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <TextField
//           name="lastName"
//           label="Last Name"
//           margin="dense"
//           fullWidth
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <TextField
//           name="email"
//           label="Email"
//           margin="dense"
//           fullWidth
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <TextField
//           name="city"
//           label="City"
//           margin="dense"
//           fullWidth
//           value={formData.city}
//           onChange={handleChange}
//           style={{ paddingRight: '5px' }}
//         />
//         <TextField
//           name="postalCode"
//           label="Postal Code"
//           margin="dense"
//           fullWidth
//           value={formData.postalCode}
//           onChange={handleChange}
//         />
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">
//           Update
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateUser;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const UpdateUser = ({ userId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    postalCode: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    // Fetch user data by ID when the component mounts
    axios.get(`http://localhost:3500/users/${userId}`)
      .then((response) => {
        // Once data is fetched, set it in the form data state
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset validation error for the field being changed
    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validation for first name and last name (letters only)
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.firstName.match(nameRegex)) {
      valid = false;
      errors.firstName = 'First name must contain only letters.';
    }

    if (!formData.lastName.match(nameRegex)) {
      valid = false;
      errors.lastName = 'Last name must contain only letters.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.match(emailRegex)) {
      valid = false;
      errors.email = 'Invalid email address.';
    }

    // Required field validation
    const requiredFields = ['firstName', 'lastName', 'email', 'city', 'postalCode'];

    for (const field of requiredFields) {
      if (!formData[field]) {
        valid = false;
        errors[field] = 'This field is required.';
      }
    }

    setValidationErrors(errors);
    return valid;
  };


// const handleSubmit = async () => {
//   if (validateForm()) {
//     try {
//       const response = await axios.put(`http://localhost:3500/users/${userId}`, formData);


//       if (response.data.message === 'A user with this email already exists.') {
//         setValidationErrors({ ...validationErrors, email: response.data.message });
//       } else {
//         onUpdate();
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   }
// };

const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:3500/users/${userId}`, formData);
  
        if (response.data.message === 'A user with this email already exists.') {
          // Set the error message for the email field
          setValidationErrors({ ...validationErrors, email: response.data.message });
        } else {
          onUpdate();
          onClose();
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          // Handle the error message from the backend
          setValidationErrors({ ...validationErrors, email: error.response.data.message });
        } else {
          console.error('Error updating user:', error);
        }
      }
    }
  };
  


  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          name="firstName"
          label="First Name"
          margin="dense"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          error={!!validationErrors.firstName}
          helperText={validationErrors.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          margin="dense"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
          error={!!validationErrors.lastName}
          helperText={validationErrors.lastName}
        />
        <TextField
          name="email"
          label="Email"
          margin="dense"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!validationErrors.email}
          helperText={validationErrors.email}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            name="city"
            label="City"
            margin="dense"
            fullWidth
            value={formData.city}
            onChange={handleChange}
            error={!!validationErrors.city}
            helperText={validationErrors.city}
            style={{ paddingRight: '5px' }}
          />
          <TextField
            name="postalCode"
            label="Postal Code"
            margin="dense"
            fullWidth
            value={formData.postalCode}
            onChange={handleChange}
            error={!!validationErrors.postalCode}
            helperText={validationErrors.postalCode}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUser;
