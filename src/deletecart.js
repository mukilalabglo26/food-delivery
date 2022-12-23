import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

import baseUrl from "./mode";

function DeleteCart() {
  const [apidata, setApidata] = useState([])
  const token = localStorage.getItem("token")

  const getCart = () => {
    axios.get(baseUrl('/cart/'), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setApidata(response.data))
      .catch((error) => console.log(error))
  }

  const deleteCart = (id) => {
    axios.delete(baseUrl(`/cart/${id}`), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <div>
      {apidata?.map((el) =>
        // {
        // return(
        //     <>
        <Button onClick={() => deleteCart(el.id)}>delete</Button>
        // </>
        //     )
        // }
      )
      }
    </div>
  )
}

export default DeleteCart;