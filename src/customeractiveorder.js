import React, { useEffect, useState } from "react";

import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

import Loader from "./loader";
import baseUrl from "./mode";

function CustomeractiveOrder() {
    const [apidata, setApidata] = useState([])
    const [data, setData] = useState([])
    const [food, setFood] = useState([])
    const [load, setLoad] = useState(false)

    const token = localStorage.getItem("token")

    const loadData = () => {
        setLoad(true)
        setTimeout(() => {
            axios.get(baseUrl("/customer/activeorders/"), {
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

    const loadData2 = () => {
        axios.get(baseUrl("/food/"), {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
            .then((response) => setFood(response.data))
            .catch((error) => console.log(error))
    }

    const cancelData = (id) => {
        console.log("id", id)
        const body = { is_cancelled: true }
        axios.put(baseUrl(`/customer/cancell/${id}/`), body, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Token ${token}`
            }
        })
            .then(() => loadData())
            .catch((error) => console.log(error))
    }

    const aproveDelivered = (id) => {
        console.log("id", id)
        const body = { is_delivered: true }
        axios.put(baseUrl(`/customer/approvedelivered/${id}/`), body, {
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Token ${token}`
            }
        })
            .then(() => loadData())
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

    useEffect(() => {
        loadData()
        loadData1()
        loadData2()
    }, [])

    return (
        <div>
            {load ? <Loader load={load} sx={{ marginTop: "15%" }} color="primary" /> : <>
                {apidata?.map((el) => {
                    return (
                        <>
                            {el.cart.map((cart) => {
                                return (
                                    <>
                                        {data?.filter((element) => element.id === cart).map((del) => {
                                            return (
                                                <>
                                                    {food?.filter((el) => el.id === del.food).map((foodlist) => {
                                                        return (
                                                            <>
                                                                <center>
                                                                    <Card sx={{ maxWidth: 600, height: 200, marginTop: 5, display: 'flex', mt: 10 }}>
                                                                        <CardMedia
                                                                            component="img"
                                                                            sx={{ width: 300 }}
                                                                            image={foodlist.image}
                                                                            alt="Live from space album cover"
                                                                        />
                                                                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                                            <CardContent>
                                                                                <Typography>food:{del.name}</Typography>
                                                                                <Typography>Quantity:{del.quantity}</Typography>
                                                                                <Typography>total_price:{el.total_price}</Typography>
                                                                                <Typography>note:{el.note}</Typography>
                                                                                {el.is_accepted === true && el.is_cancelled === false ? <> <Typography color='primary'>Enjoy your day with your food your order has been placed!...
                                                                                </Typography>
                                                                                    <br />
                                                                                    <Button variant="outlined" color="secondary" onClick={() => aproveDelivered(el.id)}>delivered</Button>
                                                                                </> : <></>}
                                                                                {el.is_accepted === false && el.is_cancelled === true ? <Typography color='secondary'>sorry your order is cancelled!...</Typography> : <></>}
                                                                                {el.is_accepted === false && el.is_cancelled === false ? <Typography color='error'>watting for confermation!...</Typography> : <></>}
                                                                                <Button variant="outlined" color="secondary" onClick={() => cancelData(el.id)}>cancelled</Button>
                                                                            </CardContent>
                                                                        </Box>
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

export default CustomeractiveOrder;