import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import BalconyIcon from '@mui/icons-material/Balcony';
import axios from "axios";
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, Menu, MenuItem, Modal, Toolbar, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Drawermodel from "./drawer";
import RestauratDrawer from "./restaurantdrawer";
import baseUrl from "./mode";

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

function Appbar() {
  const navigate = useNavigate()
  const location = useLocation('')

  const [apidata, setApidata] = useState([])
  const [open, setOpen] = useState(false);
  // const [update, setUpdate] = useState(true)
  // const [edit,setEdit] = useState([])
  // const [current,setCurrent] = useState({})
  // const [profile,setProfile] = useState({})

  const handleOpen = () => {
    setOpen(true)
    setAnchorElUser(null)
  }

  const handleClose = () => setOpen(false);

  const handleChangePassword = () => {
    navigate("/changepassword")
    setAnchorElUser(null);
  }

  const data = localStorage.getItem("data")

  const token = localStorage.getItem("token")

  const name = localStorage.getItem("name")

  const loadData = () => {
    axios.get(baseUrl('/profile/'), {
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
        "Authorization": `Token ${token}`
      }
    })
      .then((response) => setApidata(response.data))
      .catch((error) => console.log(error))
  }

  const handleLog = () => {
    localStorage.clear("token")
    navigate('/')
  }

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List>
        <IconButton onClick={toggleDrawer(anchor, false)} sx={{ ml: 23 }} color="black"><CloseIcon /></IconButton>
        <ListItem>
          <Typography variant="h5">who are we?</Typography>
        </ListItem>
        <ListItem>
          Our technology platform connects customers, restaurant partners and delivery partners, serving their multiple needs.
          Customers use our platform to search and discover their favourite food items, read and write customer generated reviews,
          offer various deals on food items, order food delivery and make payments while dining-out at restaurants.
          We provide high quality food items delivered within short time.
        </ListItem>
        <Divider />
      </List>
    </Box>)

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //   const handlEdit = (el) => {
  //     setEdit(el)
  //     setUpdate(!update)
  //     setCurrent({ username:el.username,email:el.email,first_name:el.first_name,last_name:el.last_name,password:el.password})
  //     setProfile({gender:el.profile?.gender,phone_number:el.profile?.phone_number,
  //       address:el.profile?.address,city:el.profile?.city })
  // }

  // const handleChange =(e) =>{
  //   setCurrent({...current,[e.target.name]:e.target.value})
  // }
  // const handleData = (e) => {
  //   setProfile({ ...profile, [e.target.name]: e.target.value })

  // }

  // const loadData1 = () => {
  //   // setCurrent(current)
  //   axios.put(baseUrl(`/profile/${edit.id}/`),current, {
  //     headers: {
  //       'Accept': 'application/json',
  //       "Content-Type": 'application/json',
  //       "Authorization": `Token ${token}`
  //     }
  //   })
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error))
  // }
  // console.log("current",current)

  // const deleteCart = (id) => {
  //   axios.delete(baseUrl(`/profile/${id}/`), {
  //       headers: {
  //           'Accept': 'application/json',
  //           "Content-Type": "application/json",
  //           "Authorization": `Token ${token}`
  //       }
  //   })
  //       .then(() => loadData())
  // .then((response) => console.log(response.data))
  // .catch((error) => console.log(error))
  // }

  useEffect(() => {
    loadData()
  }, [])

  // useEffect(()=>{
  //   setCurrent({ ...current, profile: profile })
  // },[profile])

  return (
    <div>
      {/* Instead of */}
      {/* {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/customer_register" &&
        location.pathname !== "/manager_register" &&
        location.pathname !== '/resetpassword' &&
        location.pathname !== '/confirmpassword' ? */}

      {/* use */}
      {!["/",
        "/login",
        "/customer_register",
        "/manager_register",
        "/resetpassword",
        "/confirmpassword",].includes(location.pathname)
       ?
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" sx={{ backgroundColor: "gray" }}>
            <Toolbar>
              {data === "false" ? <><Drawermodel /></> : <><RestauratDrawer /></>}
              <Typography color='inherit'>MENU</Typography>&nbsp;&nbsp;
              <BalconyIcon />
              <Typography><i>Balcony Food Delivery</i></Typography>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)} sx={{ ml: 120 }}>about</Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
              {apidata?.filter((el) => el.username === name).map((el) => {
                return (
                  <>
                    <Box sx={{ flexGrow: 0, ml: 10 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar />&nbsp;&nbsp;<Typography color="white">{el.username}</Typography>
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleOpen} >
                          <Typography textAlign="center">profile</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleChangePassword}>
                          <Typography textAlign="center" >change Password</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" onClick={handleLog}>Logout</Typography>
                        </MenuItem>
                      </Menu>
                      <Modal
                        open={open}
                      >
                        <Box sx={style}>
                          <Typography variant="h5" color="seagreen">Profile Details <IconButton onClick={handleClose} sx={{ marginLeft: 25 }}><CloseIcon /></IconButton></Typography>
                          <Typography>username:{el.username}</Typography>
                          <Typography>email:{el.email}</Typography>
                          <Typography>first-name:{el.first_name}</Typography>
                          <Typography>last-name:{el.last_name}</Typography>
                          <Typography>phone-number:{el.profile?.phone_number}</Typography>
                          <Typography>City:{el.profile?.city}</Typography>
                          {/* <IconButton onClick={() => deleteCart(el.id)} color="primary">
                                                            <DeleteOutlineIcon color="primary" />Delete</IconButton>
                          <IconButton onClick={() => handlEdit(el)}>
                                            <ModeEditIcon />Edit</IconButton>
                                            {update?<></>:
                                            <><Typography>username</Typography>
                                            <TextField type="text" name="username" value={current.username}  onChange={handleChange} /> */}
                          {/* <TextField type="text" name="password" value={current.password} /> */}
                          {/* <Typography>email</Typography>
                                            <TextField type="email" name="email" value={current.email} onChange={handleChange}/>
                                            <Typography>first_name</Typography>
                                            <TextField type="text" name="first_name" value={current.first_name} onChange={handleChange}/>
                                            <Typography>last_name</Typography>
                                            <TextField type="text" name="last_name" value={current.last_name} onChange={handleChange}/>
                                            <Typography>Gender</Typography>
                                            <TextField type="text" name="gender" value={profile.gender} onChange={handleData} />
                                            <Typography>phone_number</Typography>
                                            <TextField type="text" name="phone_number" value={profile.phone_number} onChange={handleData} />
                                            <Typography>Address</Typography>
                                            <TextField type="text" name="address" value={profile.address} onChange={handleData} />
                                            <Typography>City</Typography>
                                            <TextField type="text" name="city" value={profile.city} onChange={handleData} />
                                            <Button onClick={loadData1}>submit</Button>
                                            </>} */}
                        </Box>
                      </Modal>
                    </Box>
                  </>
                )
              })}
            </Toolbar>
          </AppBar>
        </Box>
        : <></>}
    </div>
  )
}

export default Appbar;