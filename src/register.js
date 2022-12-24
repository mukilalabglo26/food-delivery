import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from "@mui/icons-material";

import baseUrl from "./mode";


function Register() {
  const inputRef = useRef({})
  const [apidata, setApidata] = useState({})
  const [profile, setProfile] = useState({})
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setApidata({ ...apidata, [e.target.name]: e.target.value })
  }

  const handleData = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
    setApidata({ ...apidata, profile: profile })
  }

  const handleClose = () => {
    navigate('/')
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handle = () => {
    if (apidata.username === "" || apidata.username === undefined) {
      inputRef.current.username.focus()
    }
    else if (apidata.email === "" || apidata.email === undefined) {
      inputRef.current.email.focus()
    }
    else if (apidata.password === "" || apidata.password === undefined) {
      inputRef.current.password.focus()
    }
    else if (apidata.first_name === "" || apidata.first_name === undefined) {
      inputRef.current.first_name.focus()
    }
    else if (apidata.last_name === "" || apidata.last_name === undefined) {
      inputRef.current.last_name.focus()
    }
    //   else if (apidata.profile.gender === "" || apidata.profile.gender === undefined) {
    //     inputRef.current.gender.focus()
    //   }
    else if (apidata.profile?.phone_number === "" || apidata.profile?.phone_number === undefined) {
      inputRef.current.phone_number.focus()
    }
    else if (apidata.profile?.address === "" || apidata?.profile.address === undefined) {
      inputRef.current.address.focus()
    }
    else if (apidata.profile?.city === "" || apidata.profile?.city === undefined) {
      inputRef.current.city.focus()
    }
    else {
      setApidata(apidata)
      axios
        .post(baseUrl("/register/"), apidata)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
      navigate('/login')
    }
  }

  return (
    <div>
      <div>
        <br /><br />
        <center>
          <Card sx={{
            maxWidth: 550,
            backgroundColor: "pink"
          }}>
            <CardContent>
              <IconButton
                onClick={handleClose}
                sx={{ ml: -60 }}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h5">customer_Register</Typography>
              <br />
              <br />
              <TextField
                type="text"
                label="username"
                name="username"
                color="secondary"
                onChange={handleChange}
                inputRef={el => inputRef.current.username = el} />
              <br />
              <br />
              <TextField
                type='email'
                label="email"
                name="email"
                color="secondary"
                onChange={handleChange}
                inputRef={el => inputRef.current.email = el} />
              <br />
              <br />
              <FormControl
                sx={{
                  m: 1,
                  width: '25ch'
                }}
                variant="outlined">
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  color="secondary">
                  Password
                </InputLabel>
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  color="secondary"
                  onChange={handleChange}
                  inputRef={el => inputRef.current.password = el}
                  name="password"
                  label="Password"
                />
              </FormControl>
              <br />
              <br />
              <TextField
                type="text"
                label="First_name"
                name="first_name"
                color="secondary"
                onChange={handleChange}
                inputRef={el => inputRef.current.first_name = el} />
              <br />
              <br />
              <TextField
                type="text"
                label="Last_name"
                name="last_name"
                color="secondary"
                onChange={handleChange}
                inputRef={el => inputRef.current.last_name = el} />
              <br />
              <br />
              <Typography variant="h5">Profile</Typography><br />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  onChange={handleData}
                >
                  <FormControlLabel
                    value="F"
                    name="gender"
                    control={<Radio />} label="Female" />
                  <FormControlLabel
                    value="M"
                    name="gender"
                    control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
              <br />
              <br />
              <TextField
                type="text"
                label="phone_number"
                name="phone_number"
                color="secondary"
                onChange={handleData}
                inputRef={el => inputRef.current.phone_number = el} />
              <br />
              <br />
              <TextField
                type="text"
                label="address"
                name="address"
                color="secondary"
                onChange={handleData}
                inputRef={el => inputRef.current.address = el} />
              <br />
              <br />
              <TextField
                type="text"
                label="city"
                name="city"
                color="secondary"
                onChange={handleData}
                inputRef={el => inputRef.current.city = el} />
              <br />
              <br />
              <Button
                onClick={handle}
                color="secondary">
                submit
              </Button>
            </CardContent>
          </Card>
        </center>
      </div>
    </div>
  )
}

export default Register;