import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Typography,
  AppBar,
  Modal,
  CssBaseline,
  Divider,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Log from "../Login";
const drawerWidth = 240;
const navItems = ["Home", "Stays", "Flight", "Packages"];

function Navbar({
  window,
  user,
  logout,
  login,
  openModal,
  handleClose,
  handleOpen,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        trxvl.
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const clicked = (i) => {
    setIndex(i);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "transparent",
          boxShadow: "none",
          position: "absolute",
          display: "flex",
        }}
      >
        <Toolbar sx={{ margin: "2% 3%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: { xs: "24px", sm: "32px" },
              marginLeft: { xs: "37%", sm: "0" },
            }}
          >
            trxvl.
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex", alignItems: "center" } }}
          >
            {navItems.map((item, i) => (
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to={"/" + item}
              >
                <Button
                  sx={{
                    padding: "0",
                    textTransform: "none",
                    fontSize: "16px",
                    color: "white",
                    margin: "2vw",
                    opacity: i === index ? "1" : "0.7",
                    borderBottom: i === index ? "1px white solid" : "none",
                    borderRadius: "0",
                    "&:hover": { background: "none" },
                  }}
                  onClick={() => clicked(i)}
                >
                  {item}
                </Button>
              </NavLink>
            ))}
            {user ? (
              <button
                onClick={logout}
                sx={{
                  padding: "0",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#fff",
                  textTransform: "none",
                  marginLeft: "2vw",
                  opacity: "0.8",
                }}
              >
                Sign Out
              </button>
            ) : (
              <Button
                onClick={handleOpen}
                sx={{
                  padding: "0",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#fff",
                  textTransform: "none",
                  marginLeft: "2vw",
                  opacity: "0.8",
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Modal open={openModal} onClose={handleClose}>
        <Log handleClose={handleClose} login={login} />
      </Modal>
    </Box>
  );
}
export default Navbar;
