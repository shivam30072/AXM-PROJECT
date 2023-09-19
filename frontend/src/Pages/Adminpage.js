import { Box } from "@mui/material";
import React, { useState } from "react";
import Authenticate from "../authentication/authenticate";

const Adminpage = () => {
  const [type, setType] = useState("admin");

  return (
    <Box>
      <Authenticate type={type} />
    </Box>
  );
};

export default Adminpage;
