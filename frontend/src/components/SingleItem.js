import { Card, CardActions, CardContent, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const SingleItem = ({
  title,
  desc,
  id = "",
  setItemId,
  setItemTitle,
  setItemDesc,
  index,
  task = "",
  setOpen,
  setOpend,
}) => {
  function callEditTask() {
    setOpen(true);
    setItemId(id);
    setItemTitle(title);
    setItemDesc(desc);
  }

  function callDeleteTask() {
    setOpend(true);
    setItemId(id);
  }
  return (
    <Card
      sx={{
        borderRadius: 4,
        marginBottom: 2,
        width: 200,
        height: 200,
        marginLeft: 2,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      {task && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            alignItems: "flex-end",
            height: "60%",
          }}
        >
          <ModeEditOutlineIcon
            sx={{ width: 20, height: 20 }}
            onClick={callEditTask}
          />
          <DeleteIcon sx={{ width: 20, height: 20 }} onClick={callDeleteTask} />
        </CardActions>
      )}
    </Card>
  );
};

export default SingleItem;
