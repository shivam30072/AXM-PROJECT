import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React from "react";
import { TaskState } from "../context/Provider";

const DeleteTaskModal = ({ itemId, opend, setOpend }) => {
  const { token, allItems, setAllItems } = TaskState();

  const deleteTask = async () => {
    if (itemId) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.delete(`/api/items/${itemId}`, config);
        console.log(data.message);
        const updatedItem = allItems.filter((t) => t._id !== itemId);
        setAllItems(updatedItem);
        setOpend(false);
      } catch (error) {
        console.log("Error while deleting a task");
      }
    }
  };

  const handleClose = () => {
    setOpend(false);
  };

  return (
    <>
      <Dialog open={opend} onClose={handleClose}>
        <DialogTitle> {"Delete this task"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={deleteTask}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskModal;
