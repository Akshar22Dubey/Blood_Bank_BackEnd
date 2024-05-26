// acquire express

const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

//dot config
dotenv.config();

//Mongo db connection
connectDB();

//rest object is created
const app = express();
var corsOptions = {
  origin: "*",
  //optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/products/:id", cors(corsOptions), function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for only example.com." });
});

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"))
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Node server running In ${process.env.DEV_MODE} Modeon Port
   ${process.env.PORT}`.bgBlue.white
  );
});
