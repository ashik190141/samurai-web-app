import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import img from '../assets/logo.png'
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import HistoryEduSharpIcon from "@mui/icons-material/HistoryEduSharp";

const drawerWidth = 240;

function UserDashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
    

    const handleLogout = () => {
        localStorage.removeItem("email")
        navigate("/")
    }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div className="h-36 flex items-center gap-3">
        <div>
          <img src={img} alt="" width="70px" height="70px" />
        </div>
        <div className="text-xl">Ecosync</div>
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem key="Home" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon></HomeIcon>
              </ListItemIcon>
              <ListItemText primary="Home" onClick={handleDrawerClose} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/dashboard/issue">
          <ListItem key="issue" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReportIcon></ReportIcon>
              </ListItemIcon>
              <ListItemText
                primary="Report Issue"
                onClick={handleDrawerClose}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/dashboard/question">
          <ListItem key="question" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <QuestionMarkSharpIcon></QuestionMarkSharpIcon>
              </ListItemIcon>
              <ListItemText primary="Question" onClick={handleDrawerClose} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/dashboard/exchange">
          <ListItem key="question" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CurrencyExchangeSharpIcon></CurrencyExchangeSharpIcon>
              </ListItemIcon>
              <ListItemText
                primary="Exchange Idea"
                onClick={handleDrawerClose}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <Link to="/dashboard/educational">
          <ListItem key="educational" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HistoryEduSharpIcon></HistoryEduSharpIcon>
              </ListItemIcon>
              <ListItemText primary="Educational" onClick={handleDrawerClose} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <List>
        <ListItem key="logout" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutSharpIcon></LogoutSharpIcon>
            </ListItemIcon>
            <ListItemText primary="Logout" onClick={handleLogout} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ecosync
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        //   p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

UserDashboardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default UserDashboardLayout;
