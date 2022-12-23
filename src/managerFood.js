import React, { useState } from "react";

import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function ManagerFood() {
  const [apidata, setApidata] = useState()
  const [check, setCheck] = useState(false)
  const [image, setImage] = useState()

  const handleChange = (e) => {
    setApidata({ ...apidata, is_organic: true, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked })
  }

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const token = localStorage.getItem("token")

  const handleSubmit = () => {
    setApidata({ ...apidata, "image": image?.name, "is_vegan": check })
    let form_data = new FormData();
    form_data.append('image', image, image?.name)
    form_data.append('name', apidata.name);
    form_data.append('price', apidata.price);
    form_data.append('is_vegan', check.is_vegan);
    form_data.append("is_organic", apidata.is_organic)

    axios.post(baseUrl("/manager/foods/"),
      form_data, {
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": "multipart/from-data",
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <center>
        <Card sx={{ maxWidth: 300, mt: 10, backgroundImage: 'url("https://i.pinimg.com/736x/88/2b/d0/882bd0741dc17bf561e3c8b974660592.jpg")' }}>
          <CardContent>
            <Typography variant="h5">uploadfood</Typography>
            <TextField name="name" label="name" color="secondary" type="text" onChange={handleChange} />
            <br />
            <br />
            <TextField name="price" label="price" color="secondary" type="text" onChange={handleChange} />
            <br />
            <br />
            <TextField name="image" color="secondary" type="file" onChange={handleImage} />
            <br />
            <br />
            <FormGroup>
              <FormControlLabel control={<Checkbox name="is_vegan" checked={check} onChange={handleClick} />} label="veg" />
            </FormGroup>
            <br />
            <br />
            <Button variant="outlined" color="secondary" onClick={handleSubmit}>submit</Button>
          </CardContent>
        </Card>
      </center>
    </div>
  )
}

export default ManagerFood;