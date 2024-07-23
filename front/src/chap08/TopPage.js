import React, { Component, useState } from "react";

import { useNavigate } from "react-router-dom";




import axios from 'axios';
import Graph from 'react-json-graph';


import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export default function TopPage() {
  const navigate = useNavigate();
  async function doSome(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const resdata = {
        mail: data.get("email"),
        password: data.get("password")
      };
      const response = await axios.post('http://172.23.67.87:5000/api/login', resdata);
      localStorage.setItem('token', response.data);
      navigate("/");
    } catch (error) {
      alert('ログインエラーが発生しました。管理者にお問合せください。');
    }
  }

  return (
  <React.StrictMode>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
        <Chip label="Login" color="primary" variant="outlined" size="large" />
      </Divider>
    </Box>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={doSome} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
        </Box>
      </Box>
    </Container>
  </React.StrictMode>
  );
}
