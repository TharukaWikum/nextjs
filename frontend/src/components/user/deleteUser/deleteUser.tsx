// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';

// const DeleteUser = ({ userId, onDelete }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3500/users/${userId}`);
//       onDelete();
//       handleClose();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen} variant="contained" color="secondary">
//         Delete
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this user?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleDelete} variant="contained" color="secondary">
//             Confirm Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default DeleteUser;



import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const DeleteUser = ({ userId, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3500/users/${userId}`);
      onDelete();
      handleClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}  style={{color: 'red', border: '2px solid red'}}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ backgroundColor: 'green', color: 'white' }}>Cancel</Button>
          <Button
            onClick={handleDelete}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;

