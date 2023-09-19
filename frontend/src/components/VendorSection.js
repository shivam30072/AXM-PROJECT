import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TaskState } from "../context/Provider";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import ItemForm from "./ItemForm";
import SingleItem from "./SingleItem";
import DeleteTaskModal from "./DeleteTaskModal";

const VendorSection = () => {
  const { allItems, setAllItems, token } = TaskState();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState();
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [opend, setOpend] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function fetcAllTasks() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("/api/items", config);
        const data = response.data?.allItems;
        setAllItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error occured", error);
        setIsLoading(false);
      }
    }
    fetcAllTasks();
  }, [token]);

  if (isLoading) {
    return <Box>loading...</Box>;
  }
  return (
    <>
      {allItems && allItems?.length === 0 ? (
        <Box
          minHeight={"90vh"}
          //   bgcolor={"red"}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography p={1} borderRadius={2} bgcolor={"skyblue"}>
            You Don't Have Any Items, Create an Item
          </Typography>
          <AddBoxIcon
            onClick={handleClick}
            sx={{ width: "50px", height: "47px", cursor: "pointer" }}
          />
          <ItemForm
            open={open}
            setOpen={setOpen}
            itemId={itemId}
            itemDesc={itemDesc}
            itemTitle={itemTitle}
            setItemId={setItemId}
            setItemDesc={setItemDesc}
            setItemTitle={setItemTitle}
          />
        </Box>
      ) : (
        <Box display={"flex"}>
          <Box
            p={2}
            bgcolor={"#e5e6e6"}
            minHeight={"90vh"}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {Array.isArray(allItems) &&
              allItems.map((item, index) => (
                <SingleItem
                  key={item?._id}
                  index={index}
                  title={item?.title}
                  desc={item?.desc}
                  id={item?._id}
                  setItemId={setItemId}
                  setItemDesc={setItemDesc}
                  setItemTitle={setItemTitle}
                  task={"allTasks"}
                  setOpen={setOpen}
                  setOpend={setOpend}
                />
              ))}{" "}
            <Box display={"flex"}>
              <Typography
                p={1}
                borderRadius={2}
                bgcolor={"skyblue"}
                maxHeight={"6%"}
              >
                Create an Item
              </Typography>
              <AddBoxIcon
                onClick={handleClick}
                sx={{ width: "50px", height: "47px", cursor: "pointer" }}
              />
            </Box>
          </Box>
          <ItemForm
            open={open}
            setOpen={setOpen}
            itemId={itemId}
            itemDesc={itemDesc}
            itemTitle={itemTitle}
            setItemId={setItemId}
            setItemDesc={setItemDesc}
            setItemTitle={setItemTitle}
          />
          <DeleteTaskModal itemId={itemId} opend={opend} setOpend={setOpend} />
        </Box>
      )}
    </>
  );
};

export default VendorSection;
