import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function Login() {
  const inputRef = useRef({})
  const [apiData, setApiData] = useState({})
  const [tokenDetails, setTokenDetails] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loadData = () => {
    const { username, password } = apiData;

    if (!username) {
      inputRef.current.username.focus()
    }
    else if (!password) {
      inputRef.current.password.focus()
    }
    else {
      setApiData(apiData)
      axios
        .post(baseUrl("/login/"), apiData)
        .then((response) => {
          const { manager, user } = response.data;
          setTokenDetails(response.data);
          localStorage.setItem("data", manager);
          localStorage.setItem("name", user);
        })
        .catch((error) => console.log(error));
    }

  }

  const handling = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const { token, manager, } = tokenDetails;

    if (token !== "" && manager === "false") {
      localStorage.setItem("token", token)
      navigate("/foodlist")
    }
    else if (token !== "" && manager === "true") {
      localStorage.setItem("token", token)
      navigate("/restaurants")
    }
    else {
      navigate("/login")
    }
  }, [tokenDetails.token])

  return (
    <div>

      <center>
        <br /><br />
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography>Login...</Typography>
            <TextField
              type="text"
              label="username"
              name="username"
              color="secondary"
              value={apiData.username}
              onChange={handling}
              inputRef={el => inputRef.current.username = el} />
            <br />
            <br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                value={apiData.password}
                onChange={handling}
                inputRef={el => inputRef.current.password = el}
                name="password"
                label="Password"
              />
            </FormControl>
            <br />
            <br />
            <Button
              variant="outlined"
              color="secondary"
              onClick={loadData}>
              submit
            </Button>
            <br />
            <br />
            <br />
            <Typography>
              <Link to={'/resetpassword'}>
                forget password?
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </center>

    </div>
  )
}

export default Login;