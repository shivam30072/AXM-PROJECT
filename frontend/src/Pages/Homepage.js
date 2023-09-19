import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Homepage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="homepage">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              EVENT MANAGEMENT SYSTEM
            </Typography>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownOutlined />}
              sx={{
                marginRight: 1,
                bgcolor: "white",
                fontWeight: "bold",
                paddingY: 1,
                borderRadius: 1,
                color: "black",
              }}
            >
              LOGIN
            </Button>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  navigate("/user");
                }}
              >
                USER
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/admin");
                }}
              >
                ADMIN
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/vendor");
                }}
              >
                VENDOR
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"80%"}
        >
          <Typography fontSize={40} color={"white"} letterSpacing={5}>
            WELCOME TO OUR PLATFORM
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Homepage;
