"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import UpdateUser from "../updateUser/updateUser";
import DeleteUser from "../deleteUser/deleteUser";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Make an Axios GET request to your backend API
    axios
      .get("http://localhost:3500/users")
      .then((response) => {
        // Once data is fetched, set it in the state
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const tableHeaderStyle = {
    background: "#007acc", // Change to your desired background color
    color: "white", // Change to your desired text color
    fontSize: "18px", // Change to your desired font size
  };

  const tableStyle = {
    width: "auto", // Change to your desired fixed width
  };

  const handleUpdateClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleUpdateClose = () => {
    setSelectedUserId(null);
  };

  const handleDeleteSuccess = () => {
    // Fetch updated data or update the local state as needed
    axios
      .get("http://localhost:3500/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching updated data:", error);
      });
  };

  const handleUpdateSuccess = () => {
    // Fetch updated data or update the local state as needed
    axios
      .get("http://localhost:3500/users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching updated data:", error);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>User Information</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderStyle}>First Name</TableCell>
                  <TableCell style={tableHeaderStyle}>Last Name</TableCell>
                  <TableCell style={tableHeaderStyle}>Email</TableCell>
                  <TableCell style={tableHeaderStyle}>City</TableCell>
                  <TableCell style={tableHeaderStyle}>Postal Code</TableCell>
                  <TableCell style={tableHeaderStyle}>Action</TableCell>
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
                    <TableCell>
                      <div
                        style={{ display: "inline-block", marginRight: "8px" }}
                      >
                        <Button
                          onClick={() => handleUpdateClick(user._id)}
                          style={{ color: "green", border: "2px solid green" }}
                        >
                          Update
                        </Button>
                      </div>
                      <div style={{ display: "inline-block" }}>
                        <DeleteUser
                          userId={user._id}
                          onDelete={handleDeleteSuccess}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedUserId && (
            <UpdateUser
              userId={selectedUserId}
              onClose={handleUpdateClose}
              onUpdate={handleUpdateSuccess}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserData;
