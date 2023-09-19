import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { TaskState } from "../context/Provider";
import axios from "axios";

const ItemForm = ({
  open,
  setOpen,
  itemId,
  setItemId,
  itemTitle,
  setItemTitle,
  itemDesc,
  setItemDesc,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { token, allItems, setAllItems } = TaskState();

  const handleClose = () => {
    setOpen(false);
    setItemId("");
    setItemTitle("");
    setItemDesc("");
  };

  //editing task
  const editTask = useCallback(async () => {
    const editedtaskdetails = {
      title,
      desc,
    };
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `/api/items/${itemId}`,
        editedtaskdetails,
        config
      );

      setAllItems(data);
      setOpen(false);
      setItemId("");
      setItemTitle("");
      setItemDesc("");
    } catch (error) {
      console.log("Error while editing task", error);
    }
  }, [itemId, title, desc]);

  const handleSubmit = async () => {
    if (itemId) {
      editTask();
      return;
    }

    if (!title) {
      alert("title is required");
      return;
    }
    const itemDetails = {
      title,
      desc,
    };
    // post request for adding task
    try {
      console.log("token", token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/items", itemDetails, config);
      setAllItems([data, ...allItems]);
      setOpen(false);
      setItemTitle("");
      setItemDesc("");
    } catch (error) {
      alert("Error Occured");
      console.log("error", error);
    }

    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    setTitle(itemTitle);
    setDesc(itemDesc);
  }, [itemDesc, itemTitle]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {itemId ? `Edit this Item` : "Item Form"}</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            multiline
            rows={4}
            sx={{ marginTop: 4 }}
            value={desc}
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <Button
            sx={{ marginTop: 4, paddingY: 1.5, borderRadius: 3 }}
            variant="contained"
            fullWidth
            onClick={() => {
              handleSubmit();
            }}
          >
            {itemId ? "Edit Item" : "Add Item"}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button sx={{ bgcolor: "#e5e6e6" }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemForm;
