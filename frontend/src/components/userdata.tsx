"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an Axios GET request to your backend API
    axios.get('http://localhost:3500/users')
      .then((response) => {
        // Once data is fetched, set it in the state
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const tableHeaderStyle = {
    background: '#007acc', // Change to your desired background color
    color: 'white', // Change to your desired text color
    fontSize: '18px', // Change to your desired font size
  };

  const tableStyle = {
    width: 'auto', // Change to your desired fixed width
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>User Information</h2>
          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderStyle}>First Name</TableCell>
                  <TableCell style={tableHeaderStyle}>Last Name</TableCell>
                  <TableCell style={tableHeaderStyle}>Email</TableCell>
                  <TableCell style={tableHeaderStyle}>City</TableCell>
                  <TableCell style={tableHeaderStyle}>Postal Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.postalCode}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default UserData;
