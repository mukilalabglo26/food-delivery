import React, { useEffect, useState } from "react";

import { Box, Button, Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";
import Loader from "./loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90%",
};

function Restaurants() {
  const [apidata, setApidata] = useState([])
  const [details, setDetails] = useState([])
  const [open, setOpen] = useState(false);
  const [view, setView] = useState('')
  const [load, setLoad] = useState(false)

  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token")

  const loadData = () => {
    setLoad(true)
    setTimeout(() => {
      axios.get(baseUrl("/restaurant/"), {
        headers: {
          'Accept': 'application/json',
          "Content-Type": 'application/json',
          "Authorization": `Token ${token}`
        }
      })
        .then((response) => setApidata(response.data))
        .catch((error) => console.log(error))
      setLoad(false)
    }, 1000);

  }

  const loadData1 = () => {
    axios.get(baseUrl("/food/"))
      .then((response) => setDetails(response.data))
      .catch((error) => console.log(error))
  }

  const foods = (id) => {
    setOpen(true)
    setView(id)
    console.log("id", id)
  }

  useEffect(() => {
    loadData()
    loadData1()
  }, [])

  return (
    <div>

      <br />
      <br />
      {load ? <Loader load={load} color='primary' /> : <>
        {apidata?.map((el) => {
          return (
            <>
              <Modal
                open={open}
                onClose={handleClose}
              >

                <Box sx={style}>

                  {details?.filter((ele) => ele.restaurant === view)?.map((item) => {
                    return (
                      <>
                        <Card sx={{ maxWidth: 300, }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 300, height: 250 }}
                            image={item.image}
                            alt="Live from space album cover"
                          />
                          <CardContent>
                            <Typography>{item.name}</Typography>
                            <Typography>Rs:{item.price}</Typography>
                          </CardContent>
                        </Card>
                        <br /><br />
                      </>
                    )
                  })
                  }
                  <Button onClick={handleClose}>Close</Button>
                </Box>

              </Modal>
              <center>
                <Card sx={{ maxWidth: 500, display: 'flex', mt: 10 }} onClick={() => foods(el.id)}>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>

                      <Typography variant="h5" color='purple'>{el.name}</Typography>
                      <Typography>Food:{el.food_type}</Typography>
                      <Typography>city:{el.city}</Typography>
                      <Typography>Address:{el.address}</Typography>
                      <Typography>Open:{el.open_time}</Typography>
                      <Typography>Close:{el.close_time}</Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image={el.image}
                    alt="Live from space album cover"
                  />
                </Card>
                <br />
                <br />
              </center>
            </>
          )
        })}
      </>}
    </div >
  )
}

export default Restaurants;