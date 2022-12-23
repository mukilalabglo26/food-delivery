
import React from "react";

import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from '@mui/icons-material/Storefront';

function Firstpage() {
  const navigate = useNavigate()

  const handle = () => {
    navigate('/customer_register')
  }

  const handleManage = () => {
    navigate('/manager_register')
  }

  const handleLog = () => {
    navigate('/login')
  }

  return (
    <>
      <center>
        <div className="h2">
          <Typography variant="h4" sx={{ mt: 30 }}><em>Welcome To Balcony Food Delivery<StorefrontIcon /></em></Typography>
        </div>
      </center>
      <div style={{ marginTop: "100px", marginLeft: "100px", marginRight: "100px" }} >
        <Grid container spacing={2} >
          <Grid item xs={4} >
            <center>
              <Card sx={{ maxWidth: 300, backgroundColor: "pink" }}>
                <CardContent>
                  <Typography variant="h5">customer_register</Typography>
                  <Typography>Happy to sign-up
                    <br />
                    And Enjoy Your food
                    <br />
                    statify your customer
                    <br />
                    Share Comment And Rate
                  </Typography>
                </CardContent>
                <Button variant="outlined" color="secondary" onClick={handle}>sign-up</Button>
                <br />
                <br />
              </Card>
            </center>
          </Grid>
          <Grid item xs={4}>
            <center>
              <Card sx={{ maxWidth: 300, backgroundColor: "pink" }}>
                <CardContent>
                  <Typography variant="h5">Manager_register</Typography>
                  <Typography>Happy to sign-up
                    <br />
                    And Enjoy to share your Food
                    <br />
                    statify your customer
                    <br />
                    Share Comment And Rate
                  </Typography>
                </CardContent>
                <Button variant="outlined" color="secondary" onClick={handleManage}>sign-up</Button>
                <br />
                <br />
              </Card>
            </center>
          </Grid>
          <Grid item xs={4}>
            <center>
              <Card sx={{ maxWidth: 300, backgroundColor: "pink" }}>
                <CardContent>
                  <Typography variant="h5">Login</Typography>
                  <Typography>Happy to Login
                    <br />
                    Enjoy your Food
                    <br />
                    And Enjoy your day
                    <br />
                    Share Comment And Rate
                  </Typography>
                </CardContent>
                <Button variant="outlined" color="secondary" onClick={handleLog}>login</Button>
                <br />
                <br />
              </Card>
            </center>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Firstpage;