const express = require("express");
const path = require("path");
const connectToMongoDB = require("./connection");
const cookieParser = require("cookie-parser");

const staticRouter = require("./routes/staticRouter");
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");

const Port = 8003;

connectToMongoDB("mongodb://127.0.0.1:27017/voting").then(() =>
  console.log("Connected to MongoDB")
);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});
