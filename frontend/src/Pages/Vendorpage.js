import { Box } from "@mui/material";
import React, { useState } from "react";
import Authenticate from "../authentication/authenticate";

const Vendorpage = () => {
  const [type, setType] = useState("vendor");

  return (
    <Box>
      <Authenticate type={type} />
    </Box>
  );
};

export default Vendorpage;
