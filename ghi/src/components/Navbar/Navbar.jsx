import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./consts/navbarListItems";
import { navbarStyles } from "../styles";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { noLogNavbar } from "./consts/navbarListItems";

const Navbar = () => {
  const { token } = useToken();

  const navigate = useNavigate();
  if (token) {
    return (
      <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="right">
        <Toolbar />
        <Divider />
        <List>
          {mainNavbarItems.map((item) => (
            <ListItemButton key={item.id} onClick={() => navigate(item.route)}>
              <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  } else {
    return (
      <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="right">
        <Toolbar />
        <Divider />
        <List>
          {noLogNavbar.map((item) => (
            <ListItemButton key={item.id} onClick={() => navigate(item.route)}>
              <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
              <ListItemText sx={navbarStyles.text} primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  }
};
export default Navbar;
