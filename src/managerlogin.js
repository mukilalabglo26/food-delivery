import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function ManagerLogin() {
  const [apiData, setApiData] = useState({})
  const [tokenDetails, setTokenDetails] = useState("")
  const navigate = useNavigate()

  const loadData = () => {
    axios.post(baseUrl("/login/"), apiData)
      .then((response) => setTokenDetails(response.data.token))
      .catch((error) => console.log(error))
  }

  const handling = (e) => {
    setApiData({ ...apiData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (tokenDetails !== "") {
      localStorage.setItem("token", tokenDetails)
      navigate("/restaurants")
    }
    else {
      navigate("/managerlogin")
    }
  }, [tokenDetails])

  return (
    <div>
      <center>
        <br /><br />
        <Card sx={{ maxWidth: 275 }}>
          <CardContent>
            <Typography>Login...</Typography>
            <TextField type="text" label="username" name="username" color="secondary" value={apiData.username} onChange={handling} />
            <br />
            <br />
            <TextField type="password" label="password" name="password" color="secondary" value={apiData.password} onChange={handling} />
            <br />
            <br />
            <Button variant="outlined" color="secondary" onClick={loadData}>submit</Button>
          </CardContent>
        </Card>
      </center>

    </div>
  )
}

export default ManagerLogin;