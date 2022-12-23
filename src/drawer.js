import React, { useEffect, useState } from "react";

import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

function Drawermodel() {
  const [state, setState] = useState({
    left: false,
  });

  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const location = useLocation()
  const path = location.pathname

  const getButtonColor = () => {

    switch (path) {
      case "/customeractiveorder":
        setActive("Customeractiveorder")
        break;
      case "/customerdeliveryorder":
        setActive("Delivery-list")
        break;
      case "/restaurants":
        setActive("Restaurants List")
        break;
      case "/foodlist":
        setActive("Food Menu")
        break;
    }
  }

  const handlingChange = (index) => {
    // setSelectedIndex(index);
    if (index === 0) {
      navigate('/customeractiveorder')
    }
    else if (index === 1) {
      navigate('/customerdeliveryorder')
    }
    else if (index === 2) {
      navigate('/restaurants')
    }
    else {
      navigate('/foodlist')
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
          <IconButton onClick={toggleDrawer(anchor, false)} sx={{ ml: 23 }} ><CloseIcon /></IconButton>
        </ListItem>
        <Divider />
        {[{ name: 'Customeractiveorder', icon: <NotificationsIcon /> }, { name: 'Delivery-list', icon: <DeliveryDiningIcon /> },
        { name: 'Restaurants List', icon: <StorefrontIcon /> }, { name: 'Food Menu', icon: <RamenDiningIcon /> }].map((text, index) => (
          <ListItem key={text} >
            <ListItemButton sx={{ backgroundColor: active === text.name ? "gainsboro" : "" }} onClick={() => handlingChange(index)}>
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
          <MenuIcon color="inherit" onClick={toggleDrawer(anchor, true)} />
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

export default Drawermodel;