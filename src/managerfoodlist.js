import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import baseUrl from "./mode";
import Loader from "./loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ManagerFoodList() {
  const [apidata, setApidata] = useState([])
  const [edit, setEdit] = useState([])
  const [current, setCurrent] = useState()
  const [update, setUpdate] = useState(true)
  const [check, setCheck] = useState(false)
  const [organic, setOrganic] = useState(false)
  const [image, setImage] = useState()
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [id, setId] = useState('')

  const handleClose = () => setOpen(false);

  const token = localStorage.getItem("token")

  const loadData = () => {
    setLoad(true)
    setTimeout(() => {
      axios
        .get(baseUrl("/manager/foods/"), {
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
          }
        })
        .then((response) => setApidata(response.data))
        .catch((error) => console.log(error))
      setLoad(false)
    }, 1000);

  }

  const deleteData = () => {
    setDialog(false);
    axios
      .delete(baseUrl(`/manager/foods/${id}/`), {
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        }
      })
      .then(() => loadData())
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error))
  }

  const handleSubmit = () => {
    setCurrent({ ...current, "image": image?.name, })
    let form_data = new FormData();
    form_data.append('image', image, image?.name)
    form_data.append('name', current.name);
    form_data.append('price', current.price);
    form_data.append('is_vegan', check.is_vegan);
    form_data.append("is_organic", organic.is_organic)

    axios
      .put(baseUrl(`/manager/foods/${edit.id}/`),
        form_data, {
        headers: {
          'Accept': 'application/json',
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${token}`
        }
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  const handlEdit = (el) => {
    setOpen(true)
    setEdit(el)
    setUpdate(!update)
    setCurrent({ name: el.name, price: el.price, is_organic: el.is_organic, is_vegan: el.is_vegan })
  }

  const handleChange = (e) => {
    setCurrent({ ...current, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked })
  }

  const handleClick1 = (e) => {
    setOrganic({ ...organic, [e.target.name]: e.target.checked })
  }

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleClickOpen = (id) => {
    setId(id)
    setDialog(true);
  };

  const handleDeleteClose = () => {
    setDialog(false);
  };

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      {load ? <Loader load={load} /> : <>
        <Grid
          container
          spacing={2}
          direction="row"
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
                  md={4}
                  key={apidata.indexOf(el)} >
                  <Card sx={{ maxWidth: 300, mt: 10, ml: 5 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 300, height: 250 }}
                      image={el.image}
                      alt="Live from space album cover"
                    />
                    <CardContent>
                      <Typography>{el.name}</Typography>
                      <Typography>{el.price}</Typography>
                      <IconButton onClick={() => handleClickOpen(el.id)} color="primary">
                        <DeleteOutlineIcon color="primary" />Delete</IconButton>
                      <Dialog
                        open={dialog}
                        onClose={handleDeleteClose}
                        hideBackdrop
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Do You Want To Delete?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleDeleteClose}>No</Button>
                          <Button onClick={() => deleteData()} autoFocus>
                            yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <IconButton onClick={() => handlEdit(el)}>
                        <ModeEditIcon />Edit</IconButton>
                      <Modal
                        open={open}
                        onClose={handleClose}
                      >
                        <Box sx={style}>
                          <IconButton
                            onClick={handleClose}
                            sx={{ marginLeft: 45 }}
                            color="black">
                            <CloseIcon />
                          </IconButton>
                          {update ? <></> : <>
                            <Card sx={{ maxWidth: 300 }}>
                              <CardContent>
                                <Typography variant="h5">uploadfood</Typography>
                                <TextField
                                  name="name"
                                  color="secondary"
                                  type="text"
                                  value={current.name}
                                  onChange={handleChange} />
                                <br />
                                <br />
                                <TextField
                                  name="price"
                                  color="secondary"
                                  type="text"
                                  value={current.price}
                                  onChange={handleChange} />
                                <br />
                                <br />
                                <TextField
                                  name="image"
                                  color="secondary"
                                  type="file"
                                  onChange={handleImage} />
                                <br />
                                <br />
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox
                                      name="is_vegan"
                                      checked={check.is_vegan}
                                      onChange={handleClick} />} label="vegan" />
                                </FormGroup>
                                <br />
                                <br />
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox
                                      name="is_organic"
                                      checked={organic.is_organic}
                                      onChange={handleClick1} />} label="organic" />
                                </FormGroup>
                                <br />
                                <br />
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={handleSubmit}>
                                  submit
                                </Button>
                              </CardContent>
                            </Card>

                          </>}
                        </Box>
                      </Modal>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )
          })}
        </Grid>
      </>}
    </div>
  )
}

export default ManagerFoodList;