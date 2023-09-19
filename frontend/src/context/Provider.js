import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState();
  const [allItems, setAllItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logedInUser = JSON.parse(localStorage.getItem("userDetails"));
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    setUserDetails(logedInUser?.user);
    setIsLoggedIn(loggedIn);
    setToken(logedInUser?.token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        setUserDetails,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        allItems,
        setAllItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const TaskState = () => {
  return useContext(AuthContext);
};

export default Provider;
