import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function ResetPassword() {
  const [apidata, setApidata] = useState({})

  const navigate = useNavigate()

  const loadData = () => {
    axios.post(baseUrl("/api/password_reset/"), apidata)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
    navigate('/confirmpassword')
  }

  return (
    <div>
      <center>
        <Card sx={{ maxWidth: 350, mt: 15 }}>
          <CardContent>
            <Typography variant="h5">ResetPassword</Typography>
            <TextField
              name='email'
              label='email'
              type='email'
              onChange={(e) => setApidata({ ...apidata, [e.target.name]: e.target.value })} />
            <br />
            <br />
            <Button
              onClick={loadData}>
              submit
            </Button>
          </CardContent>
        </Card>
      </center>
    </div>
  )
}

export default ResetPassword;