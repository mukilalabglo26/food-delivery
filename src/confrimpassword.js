import React, { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function ConfrimPassword() {
    const [apidata, setApidata] = useState({})

    const handleChange = (e) => {
        setApidata({ ...apidata, [e.target.name]: e.target.value })
    }

    const loadData = () => {
        axios
            .post(baseUrl("/api/password_reset/confirm/"), apidata)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <center>
                <Card sx={{ maxWidth: 350, mt: 15 }}>
                    <CardContent>
                        <Typography variant="h5">confirm resetpassword</Typography>
                        <TextField
                            name="password"
                            type='text'
                            label='password'
                            onChange={handleChange} />
                        <br />
                        <br />
                        <TextField
                            name="token"
                            type='text'
                            label='token'
                            onChange={handleChange} />
                        <br />
                        <br />
                        <Button onClick={loadData}>submit</Button>
                    </CardContent>
                </Card>
            </center>
        </div>
    )
}

export default ConfrimPassword;