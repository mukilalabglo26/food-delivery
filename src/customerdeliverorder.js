import React, { useEffect, useState } from "react";

import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

import Loader from "./loader";
import baseUrl from "./mode";

function CustomerDeliverOrderlist() {
    const [apidata, setApidata] = useState([])
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    const token = localStorage.getItem("token")

    const loadData = () => {
        setLoad(true)
        setTimeout(() => {
            axios.get(baseUrl("/customer/deliveredorders/"), {
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

    useEffect(() => {
        loadData1()
        loadData()
    }, [])

    return (
        <div>
            {load ? <Loader load={load} color="primary" sx={{ mt: 15 }} /> : <>
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
                            {el.cart.map((cart) => {
                                return (
                                    <>
                                        {data?.filter((element) => element.id === cart).map((del) => {
                                            return (
                                                <>
                                                    <center>
                                                        <Card sx={{ maxWidth: 600, height: 400, mt: 10, backgroundImage: 'url("https://techstory.in/wp-content/uploads/2015/05/food-delivery.jpg")' }}>
                                                            <CardContent>
                                                                <Typography>food:{del.name}</Typography>
                                                                <Typography>Quantity:{del.quantity}</Typography>
                                                                <Typography>total_price:{el.total_price}</Typography>
                                                                <Typography>note:{el.note}</Typography>
                                                                <Typography>customer:{el.customer}</Typography>
                                                                <Typography>delivered-time:{formattedDate}</Typography>
                                                                {el.is_delivered === true ? <Typography color="primary">your order has been delivered Enjoy your food!...</Typography> : <></>}
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
            </>}
        </div>
    )
}

export default CustomerDeliverOrderlist;