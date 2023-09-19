import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskState } from "../context/Provider";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import VendorSection from "../components/VendorSection";
import AdminSection from "../components/AdminSection";

const UserProfilePage = () => {
  const { id } = useParams();

  const { userDetails, setUserDetails } = TaskState();

  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  console.log(userDetails);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails]);
  return (
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
            WELCOME{" "}
            <span style={{ color: "yellow" }}>
              {" "}
              {userDetails?.name
                ? userDetails?.name.toUpperCase()
                : userDetails?.email}
            </span>
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
            <PersonIcon />
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
                localStorage.clear();
                setUserDetails({});
                navigate("/");
              }}
            >
              LOGOUT
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <AdminSection />
    </Box>
  );
};

export default UserProfilePage;
