import React, { useEffect, useState } from "react";

import { Card, 
  CardContent, 
  Typography } from "@mui/material";
import axios from "axios";

import Loader from "./loader";
import baseUrl from "./mode";

function ManagerDeliveryOrder() {
  const [apidata, setApidata] = useState([])
  const [data, setData] = useState([])
  const [view, setView] = useState([])
  const [load, setLoad] = useState(false)

  const token = localStorage.getItem("token")

  const loadData = () => {
    setLoad(true)
    setTimeout(() => {
      axios
      .get(baseUrl("/manager/deliveredorders/"), {
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
    axios
    .get(baseUrl("/profile/"), {
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
    axios
    .get(baseUrl("/cartlist/"), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    loadData()
    profileData()
    loadData1()
  }, [])

  return (
    <div>
      {load ? <Loader load={load} /> : <>
        {apidata?.map((el) => {
          const date = new Date(el.delivered_datetime)
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: '2-digit', minute: '2-digit'
          })
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
                                <center>
                                  <Card 
                                  sx={{ maxWidth: 600, 
                                  height: 400, mt: 10, 
                                  backgroundImage: 'url("https://techstory.in/wp-content/uploads/2015/05/food-delivery.jpg")' }}>
                                    <CardContent>
                                      <Typography>Name:{lists.username}</Typography>
                                      <Typography>Address:{lists.profile?.address}</Typography>
                                      <Typography>City:{lists.profile?.city}</Typography>
                                      <Typography>Phone-No:{lists.profile?.phone_number}</Typography>
                                      <Typography>food:{del.name}</Typography>
                                      <Typography>Quantity:{del.quantity}</Typography>
                                      <Typography>total_price:{el.total_price}</Typography>
                                      <Typography>note:{el.note}</Typography>
                                      <Typography>delivered-time:{formattedDate}</Typography>
                                      {el.is_delivered === true ? <Typography color="primary">order delivered!...</Typography> : <></>}
                                    </CardContent>
                                  </Card>
                                  <br />
                                </center>
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

export default ManagerDeliveryOrder;