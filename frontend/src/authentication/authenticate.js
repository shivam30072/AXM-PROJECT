import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { TaskState } from "../context/Provider";
import { useNavigate } from "react-router-dom";

const Authenticate = ({ type }) => {
  const [open, setOpen] = useState(true);
  const [loginSignup, setLoginSignup] = useState("signup");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userData;
  const { setUserDetails } = TaskState();
  const navigate = useNavigate();

  const handleChangeForm = () => {
    if (loginSignup === "signup") {
      setLoginSignup("login");
    } else {
      setLoginSignup("signup");
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const apiCallForAuthentication = async () => {
    let userInfo;
    if (loginSignup === "signup") {
      if (type === "user") {
        userInfo = {
          name,
          email,
          password,
        };
      } else {
        userInfo = {
          email,
          password,
        };
      }
    } else {
      userInfo = {
        email,
        password,
      };
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/${type}/${loginSignup}`,
        userInfo,
        config
      );
      if (loginSignup === "login") {
        localStorage.setItem("userDetails", JSON.stringify(data));
        localStorage.setItem("loggedIn", true);
        // setIsLoggedIn(true);
        setUserDetails(data?.user);
        setOpen(false);
        navigate(`/${type}/profile/${data?.user?._id}`);
      }
    } catch (error) {
      alert("user not Found");
      console.log("error occured", error);
    }
  };

  const handleSubmit = () => {
    if (loginSignup === "signup") {
      if (type === "user") {
        if (!name || !email || !password || !confirmPassword) {
          alert("all fields are mandatory");
          return;
        }

        if (password !== confirmPassword) {
          alert("Password and Confirm Password should be same");
          return;
        }
        apiCallForAuthentication();
        setLoginSignup("login");
      } else if (!email || !password || !confirmPassword) {
        alert("all fields are mandatory");
        return;
      }

      if (password !== confirmPassword) {
        alert("Password and Confirm Password should be same");
        return;
      }
      apiCallForAuthentication();
      setLoginSignup("login");
    } else {
      if (!email || !password) {
        alert("Both fields are mandatory");
        return;
      }
      apiCallForAuthentication();
      console.log("User Logged in");
    }
    setUserData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog
      open={open}
      sx={{
        minHeight: "100vh",
        bgcolor: "#e5e6e6",
      }}
    >
      <DialogTitle sx={{}}>
        {" "}
        {loginSignup === "signup" ? `Sign Up as ${type}` : `Login as ${type}`}
      </DialogTitle>
      <DialogContent sx={{}}>
        {loginSignup === "signup" && type === "user" && (
          <TextField
            value={name}
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
        <TextField
          sx={{ marginTop: 2 }}
          value={email}
          margin="dense"
          name="email"
          label="Email"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
        />
        <TextField
          sx={{ marginTop: 2 }}
          value={password}
          margin="dense"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleInputChange}
        />
        {loginSignup === "signup" && (
          <TextField
            sx={{ marginTop: 2 }}
            value={confirmPassword}
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
          />
        )}
        <Typography
          mt={0.5}
          ml={0.5}
          color={"#3cc8ff"}
          sx={{ cursor: "pointer" }}
          onClick={handleChangeForm}
        >
          {loginSignup === "signup" ? "Login" : "Sign Up"}
        </Typography>
        <Button
          sx={{
            marginTop: 2,
            paddingY: 1.5,
            borderRadius: 3,
            bgcolor: "#570df8",
            "&:hover": { bgcolor: "#3936d8" },
          }}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          {"Submit"}
        </Button>
      </DialogContent>
      {/* <DialogActions>
            <Button sx={{ bgcolor: "#e5e6e6" }} onClick={handleClose}>
              Close
            </Button>
          </DialogActions> */}
    </Dialog>
  );
};

export default Authenticate;
