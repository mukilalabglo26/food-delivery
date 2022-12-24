import React, { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function ChangePassword() {
  const [apidata, setApidata] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNewShowPassword = () => setNewPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNewMouseDownPassword = (e) => {
    e.preventDefault()
  }

  const handling = (e) => {
    setApidata({ ...apidata, [e.target.name]: e.target.value })
  }

  const token = localStorage.getItem("token")

  const loadData = () => {
    axios
      .put(baseUrl("api/change-password/"), apidata, {
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json',
          "Authorization": `Token ${token}`
        }
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <center>
        <Card sx={{ maxWidth: 275, mt: 10 }} className="card">
          <CardContent>
            <Typography variant="h5">ChangePassword</Typography>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary">old-Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                color="secondary"
                value={apidata.old_password}
                onChange={handling}
                name="old_password"
                label="old_Password"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary">new-Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={newPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleNewShowPassword}
                      onMouseDown={handleNewMouseDownPassword}
                      edge="end"
                    >
                      {newPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                color="secondary" value={apidata.new_password} onChange={handling}
                name="new_password"
                label="new_Password"
              />
            </FormControl>
            <Button color="secondary" onClick={loadData}>submit</Button>
          </CardContent>
        </Card>
      </center>
    </div>
  )
}

export default ChangePassword;