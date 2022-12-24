import React, { useEffect, useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import StorefrontIcon from '@mui/icons-material/Storefront';

function RestauratDrawer() {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const [state, setState] = useState({
    left: false,
  });

  const location = useLocation()

  const path = location.pathname

  const getButtonColor = () => {

    switch (path) {
      case "/restaurants_reg":
        setActive("Restaurant-register")
        break;
      case "/uploadfood":
        setActive("Uploadfood")
        break;
      case "/manageractiveorder":
        setActive("Orderlist")
        break;
      case "/managerdelivery":
        setActive("Delivery-list")
        break;
      case "/managerfoodlist":
        setActive("Foodlist")
        break;
      case "/restaurants":
        setActive("Restaurants List")
        break;
    }
  }

  const handlingChange = (index) => {
    if (index === 0) {
      navigate('/restaurants_reg')
    }
    else if (index === 1) {
      navigate('/uploadfood')
    }
    else if (index === 2) {
      navigate('/manageractiveorder')
    }
    else if (index === 3) {
      navigate('/managerdelivery')
    }
    else if (index === 4) {
      navigate('/managerfoodlist')
    }
    else {
      navigate('/restaurants')
    }
  }

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
        <ListItem>
          <IconButton
            onClick={toggleDrawer(anchor, false)}
            sx={{ ml: 23 }} >
            <CloseIcon />
          </IconButton>
        </ListItem>
        <Divider />
        {[{ name: 'Restaurant-register', icon: <AppRegistrationIcon /> },
        { name: 'Uploadfood', icon: <RestaurantMenuIcon /> },
        { name: 'Orderlist', icon: <NotificationsIcon /> },
        { name: 'Delivery-list', icon: <DeliveryDiningIcon /> },
        { name: 'Foodlist', icon: <RamenDiningIcon /> },
        { name: 'Restaurants List', icon: <StorefrontIcon /> }].map((text, index) => (
          <ListItem key={text} >
            <ListItemButton
              sx={{ backgroundColor: active === text.name ? "gainsboro" : "" }}
              onClick={() => handlingChange(index)}>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
      </List>
    </Box>)

  useEffect(() => {
    getButtonColor()
  }
    , [location.pathname])

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            color="inherit"
            onClick={toggleDrawer(anchor, true)} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default RestauratDrawer;