require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
const vendorRouter = require("./routes/vendorRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const vendorItemRouter = require("./routes/vendorItemRoutes");
const adminItemRouter = require("./routes/adminItemRoutes");
const authMiddleware = require("./middleware/authentication");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/items", authMiddleware, vendorItemRouter);
app.use("/api/vendors", authMiddleware, adminItemRouter);

//------------------------Deployment-----------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running successfully");
  });
}
//------------------------Deployment-----------------

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
