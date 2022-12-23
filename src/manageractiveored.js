import React, { useEffect, useState } from "react";

import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";

import Loader from "./loader";
import baseUrl from "./mode";

function ManagerActiveOrder() {
  const [apidata, setApidata] = useState([])
  const [data, setData] = useState([])
  const [view, setView] = useState([])
  const [food, setFood] = useState([])
  const [load, setLoad] = useState(false)

  const token = localStorage.getItem("token")

  const loadData = () => {
    setLoad(true)
    setTimeout(() => {
      axios.get(baseUrl("/manager/activeorders/"), {
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

  const profileData = () => {
    axios.get(baseUrl("/profile/"), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setView(response.data))
      .catch((error) => console.log(error))
  }

  const loadData1 = () => {
    axios.get(baseUrl("/cartlist/"), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }

  const loadData2 = () => {
    axios.get(baseUrl("/food/"), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setFood(response.data))
      .catch((error) => console.log(error))
  }

  const acceptData = (id) => {
    console.log("id", id)
    const body = { is_accepted: true }
    axios.put(baseUrl(`/manager/accept/${id}/`), body, {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then(() => loadData())
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error))
  }

  const cancelData = (id) => {
    console.log("id", id)
    const body = { is_cancelled: true }
    axios.put(baseUrl(`/manager/cancell/${id}/`), body, {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then(() => loadData())
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error))
  }

  useEffect(() => {
    loadData()
    profileData()
    loadData1()
    loadData2()
  }, [])

  return (
    <div>
      <center>
        <Typography variant="h5" sx={{ mt: 10 }}>FoodOrder Details</Typography>
      </center>
      {load ? <Loader load={load} /> : <>
        {apidata?.filter((ele) => ele.is_cancelled === false).map((el) => {
          return (
            <>
              {view?.filter((list) => list.id === el.customer).map((lists) => {
                return (
                  <>
                    {el.cart.map((cart) => {
                      return (
                        <>
                          {data?.filter((element) => element.id === cart).map((del) => {
                            return (
                              <>
                                {food.filter((fo) => fo.id === del.food).map((foodlist) => {
                                  return (
                                    <>
                                      <center>
                                        <Card sx={{ maxWidth: 600, height: 250, mt: 5, display: 'flex' }}>
                                          <CardMedia
                                            component="img"
                                            sx={{ width: 300 }}
                                            image={foodlist.image}
                                            alt="Live from space album cover"
                                          />
                                          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <CardContent>
                                              <Typography>CustomerName:{lists.username}</Typography>
                                              <Typography>Address:{lists.profile?.address}</Typography>
                                              <Typography>City:{lists.profile?.city}</Typography>
                                              <Typography>Phone-No:{lists.profile?.phone_number}</Typography>
                                              <Typography>food:{del.name}</Typography>
                                              <Typography>Quantity:{del.quantity}</Typography>
                                              <Typography>total_price:{el.total_price}</Typography>
                                              <Typography>note:{el.note}</Typography>
                                              {el.is_accepted === false ?
                                                <Button variant="outlined" color="secondary" onClick={() => acceptData(el.id)}>accept</Button> : <></>}&nbsp;
                                              <Button variant="outlined" color="secondary" onClick={() => cancelData(el.id)}>cancel</Button>
                                            </CardContent>
                                          </Box>
                                        </Card>
                                      </center>
                                      <br />
                                    </>
                                  )
                                })}
                              </>
                            )
                          })}
                        </>
                      )
                    })}
                  </>
                )
              })}
            </>
          )
        })}
      </>}
    </div>
  )
}

export default ManagerActiveOrder;