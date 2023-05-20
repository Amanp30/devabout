const path = require("path");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;

//app
const app = express();

/* Routes Here */
const userRoutes = require("./routes/auth");
const authorRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const projectRoutes = require("./routes/projects");

/* Images routes */
app.use(
  "/projectimages",
  express.static(path.join(__dirname, "uploads/projectimg"))
);
app.use(
  "/profile",
  express.static(path.join(__dirname, "uploads/profilephoto"))
);
app.use("/projectlogo", express.static(path.join(__dirname, "uploads/logo")));

//database

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

mongoose.set("debug", true);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"
  );
  next();
});

//route middlewares
app.use("/api", userRoutes);
app.use("/api", authorRoutes);
app.use("/api", profileRoutes);
app.use("/api", projectRoutes);

// Server working routes
app.get("/checkserver", (req, res) => {
  return res.json({ success: "yes" });
});

//cors
if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  app.use(cors(corsOptions));
}

//port
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
