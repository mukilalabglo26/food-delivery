import React, { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SendIcon from "@mui/icons-material/Send";

import App from "./App.css";
import baseUrl from "./mode";
import Loader from "./loader";

function Foodlist() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
    maxHeight: "90%",
  };
  const initial = 1;
  const [apidata, setApidata] = useState([]);
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState();
  const [data, setData] = useState();
  const [addcart, setAddcart] = useState(false);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState("");
  // const [detail, setDetail] = useState()
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [update, setUpdate] = useState(true);
  const [current, setCurrent] = useState();
  const [edit, setEdit] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCartClose = () => setAddcart(false);

  const [load, setLoad] = useState(false);

  const loadFoodData = () => {
    setLoad(true);
    setTimeout(() => {
      axios
        .get(baseUrl("/food/"), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => setApidata(response.data))
        .catch((error) => console.log(error));
      setLoad(false);
    }, 1000);
  };

  const addCart = () => {
    setCount(initial);
    const body = { quantity: count, food: data.food, price: data.price };

    axios
      .post(baseUrl("/cart/"), body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => loadaddCart())
      .catch((error) => console.log(error));
  };

  const loadaddCart = () => {
    axios
      .get(baseUrl("/cart/"), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error));
  };

  const orderCart = (id) => {
    const body = { note: order, cart: [id] };

    axios
      .post(baseUrl("/customer/neworder/"), body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    setCount(initial);
  };

  const deleteCart = () => {
    setDialog(false);
    axios
      .delete(baseUrl(`/cart/${id}/`), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => loadaddCart());
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error))
  };

  const editCart = () => {
    axios
      .put(baseUrl(`/cart/${edit.id}/`), current, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => loadaddCart());
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error))
  };

  const handlEdit = (el) => {
    setEdit(el);
    setUpdate(!update);
    setCurrent({ quantity: el.quantity, food: el.food });
  };

  const toggleDrawer = (id, price) => () => {
    setAddcart(true);
    setData({ ...data, food: id, price: price });
    console.log("food", id);
  };

  const searchItems = (searchValue) => {
    setSearch(searchValue);
    if (search !== "") {
      const filteredData = apidata.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(apidata);
    }
  };

  const handleClickOpen = (id) => {
    setId(id);
    setDialog(true);
  };

  const handleDeleteClose = () => {
    setDialog(false);
  };

  useEffect(() => {
    loadFoodData();
    loadaddCart();
  }, []);

  return (
    <div>
      <br />
      <br />
      <Badge color="secondary" sx={{ mt: 7 }} badgeContent={cart?.length}>
        <AddShoppingCartIcon
          color="primary"
          sx={{ ml: 10 }}
          onClick={handleOpen}
        />
      </Badge>
      <TextField
        name="search"
        label="search"
        type="search"
        onChange={(e) => searchItems(e.target.value)}
        sx={{ ml: 140, mt: 7 }}
      />
      <br />
      <br />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={{ ml: 75 }}>
            <CloseIcon />
            close
          </IconButton>
          {cart?.map((el) => {
            return (
              <>
                {apidata
                  ?.filter((ele) => ele.id === el.food)
                  .map((element) => {
                    return (
                      <>
                        <Card
                          sx={{ maxWidth: 700, height: 280, display: "flex" }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ width: 300 }}
                            image={element.image}
                            alt="Live from space album cover"
                          />
                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <CardContent>
                              <Typography variant="h5">
                                {el.resname.slice(4, -1)}
                              </Typography>
                              <Typography>Food:{el.name}</Typography>
                              <Typography>Quantity:{el.quantity}</Typography>
                              <Typography>Price:{el.price}</Typography>
                              <TextField
                                name="note"
                                label="note"
                                type="text"
                                onChange={(e) => setOrder(e.target.value)}
                              />
                              <Button onClick={() => orderCart(el.id)}>
                                order
                              </Button>
                              <IconButton
                                onClick={() => handleClickOpen(el.id)}
                                color="primary"
                              >
                                <DeleteOutlineIcon color="primary" />
                                Delete
                              </IconButton>
                              <Dialog
                                open={dialog}
                                onClose={handleDeleteClose}
                                hideBackdrop
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Do You Want To Delete?"}
                                </DialogTitle>
                                <DialogActions>
                                  <Button onClick={handleDeleteClose}>
                                    No
                                  </Button>
                                  <Button
                                    onClick={() => deleteCart()}
                                    autoFocus
                                  >
                                    yes
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              <IconButton onClick={() => handlEdit(el)}>
                                <ModeEditIcon />
                                Edit
                              </IconButton>
                              {update ? (
                                <></>
                              ) : (
                                <>
                                  <TextField
                                    type="number"
                                    name="quantity"
                                    value={current.quantity}
                                    onChange={(e) =>
                                      setCurrent({
                                        ...current,
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  />
                                  <SendIcon sx={{ mt: 3 }} onClick={editCart} />
                                </>
                              )}
                            </CardContent>
                          </Box>
                        </Card>
                        <br />
                      </>
                    );
                  })}
              </>
            );
          })}
        </Box>
      </Modal>
      {search.length > 1 ? (
        filteredResults.map((item) => {
          return (
            <>
              <center>
                <Card sx={{ maxWidth: 450, display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      variant="contained"
                      onClick={toggleDrawer(item.id, item.price)}
                    >
                      add to card
                    </Button>
                    <Modal open={addcart} onClose={handleCartClose}>
                      <Box sx={style}>
                        <Badge color="secondary" badgeContent={count}>
                          <AddShoppingCartIcon />
                        </Badge>
                        <Button
                          onClick={() => {
                            setCount(Math.max(count - 1, 1));
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          onClick={() => {
                            setCount(count + 1);
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                        <Button onClick={addCart}>add</Button>
                        <br />
                        <br />
                        <IconButton onClick={handleCartClose}>
                          <CloseIcon />
                          close
                        </IconButton>
                      </Box>
                    </Modal>
                    <CardContent>
                      <Typography variant="h5" color="secondary">
                        {item.name}
                      </Typography>
                      <Typography>Rs:{item.price}</Typography>
                      <Typography>{item.is_vegan}</Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image={item.image}
                    alt="Live from space album cover"
                  />
                </Card>
              </center>
              <br />
              <br />
            </>
          );
        })
      ) : (
        <>
          {load ? (
            <Loader load={load} color="primary" />
          ) : (
            <>
              <Grid
                container
                spacing={4}
                direction="row"
                sx={{ ml: 4 }}
                justify="flex-start"
                alignItems="flex-start"
              >
                {apidata?.map((el) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        key={apidata.indexOf(el)}
                      >
                        <Card
                          sx={{ maxWidth: 600, height: 200, display: "flex" }}
                          className="card"
                        >
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Button
                              variant="contained"
                              onClick={toggleDrawer(el.id, el.price)}
                            >
                              add to card
                            </Button>
                            <Modal open={addcart} onClose={handleCartClose}>
                              <Box sx={style}>
                                <IconButton
                                  onClick={handleCartClose}
                                  sx={{ ml: 75 }}
                                  color="primary"
                                >
                                  <CloseIcon color="primary" />
                                  close
                                </IconButton>
                                <br />
                                <br />
                                <Badge color="secondary" badgeContent={count}>
                                  <AddShoppingCartIcon />
                                </Badge>
                                <Button
                                  onClick={() => {
                                    setCount(Math.max(count - 1, 1));
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                  onClick={() => {
                                    setCount(count + 1);
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </Button>
                                <Button onClick={addCart}>add</Button>
                                <br />
                                <br />
                              </Box>
                            </Modal>
                            <CardContent>
                              <Typography variant="h5" color="seagreen">
                                {el.name}
                              </Typography>
                              <Typography>Rs:{el.price}</Typography>
                              <Typography>{el.is_vegan}</Typography>
                            </CardContent>
                          </Box>
                          <CardMedia
                            component="img"
                            sx={{ width: 300, ml: 20 }}
                            image={el.image}
                            alt="Live from space album cover"
                          />
                        </Card>
                      </Grid>
                      <br />
                      <br />
                    </>
                  );
                })}
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Foodlist;
