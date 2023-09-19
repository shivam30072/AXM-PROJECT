import { Box } from "@mui/material";
import React, { useState } from "react";
import Authenticate from "../authentication/authenticate";

const Userpage = () => {
  const [type, setType] = useState("user");

  return (
    <Box>
      <Authenticate type={type} />
    </Box>
  );
};

export default Userpage;
