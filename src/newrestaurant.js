import React, { Fragment, useRef, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function Newrestaurant() {
  const inputRef = useRef({})

  const [apidata, setApidata] = useState()
  const [image, setImage] = useState()

  const token = localStorage.getItem("token")

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    setApidata({ ...apidata, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Use Object destructuring
    if (apidata.name === "" || apidata.name === undefined) {
      inputRef.current.name.focus()
    }
    else if (apidata.food_type === "" || apidata.food_type === undefined) {
      inputRef.current.food_type.focus()
    }
    else if (apidata.city === "" || apidata.city === undefined) {
      inputRef.current.city.focus()
    }
    else if (apidata.address === "" || apidata.address === undefined) {
      inputRef.current.address.focus()
    }
    else if (apidata.open_time === "" || apidata.open_time === undefined) {
      inputRef.current.open_time.focus()
    }
    else if (apidata.close_time === "" || apidata.close_time === undefined) {
      inputRef.current.close_time.focus()
    }
    else if (apidata.image === "" || apidata.image === undefined) {
      inputRef.current.image.focus()
    }
    else {
      setApidata({ ...apidata, "image": image?.name })
      let form_data = new FormData();
      form_data.append('image', image, image?.name)
      form_data.append('name', apidata.name);
      form_data.append('food_type', apidata.food_type);
      form_data.append('city', apidata.city);
      form_data.append('address', apidata.address);
      form_data.append('open_time', apidata.open_time);
      form_data.append('close_time', apidata.close_time);
      console.log("form_data,", form_data);

      axios
        .post(baseUrl("/manager/newrestaurant/"),
          form_data, {
          headers: {

            "Content-Type": "multipart/from-data",
            "Authorization": `Token ${token}`
          }
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }
  }

  return (
    <div>
      <br />
      <br />
      <center>
        <Card sx={{ maxWidth: 300, mt: 10 }}>
          <CardContent>
            <Typography variant="h5">Hotel Register</Typography>

            {[
              { name: "name", label: "hotel name", type: "text" },
              { name: "food_type", label: "food", type: "text" },
              { name: "city", label: "city", type: "text" },
              { name: "address", label: "address", type: "text" },
              { name: "open_time", type: "time" },
              { name: "close_time", type: "time" },
              { name: "image", type: "file" },
            ].map((each) => (
              <Fragment key={each}>
                <TextField
                  name={each.name}
                  label={each.label || ""}
                  color="secondary"
                  type={each.type}
                  onChange={handleChange}
                  inputRef={(el) => (inputRef.current.name = el)}
                />
                <br />
                <br />
              </Fragment>
            ))}


            {/* <TextField name="name" label="hotel name" color="secondary" type="text" onChange={handleChange} inputRef={el => inputRef.current.name = el} />
            <br />
            <br />
            <TextField name="food_type" label="food" color="secondary" type="text" onChange={handleChange} inputRef={el => inputRef.current.food_type = el} />
            <br />
            <br />
            <TextField name="city" label="city" color="secondary" type="text" onChange={handleChange} inputRef={el => inputRef.current.city = el} />
            <br />
            <br />
            <TextField name="address" label="address" color="secondary" type="text" onChange={handleChange} inputRef={el => inputRef.current.address = el} />
            <br />
            <br />
            <TextField name="open_time" color="secondary" type="time" onChange={handleChange} inputRef={el => inputRef.current.open_time = el} />
            <br />
            <br />
            <TextField name="close_time" color="secondary" type="time" onChange={handleChange} inputRef={el => inputRef.current.close_time = el} />
            <br />
            <br />
            <TextField name="image" type="file" onChange={handleImage} inputRef={el => inputRef.current.image = el} />
            <br />
            <br /> */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSubmit}>
              submit
            </Button>
          </CardContent>
        </Card>
      </center>
    </div>
  )
}

export default Newrestaurant;