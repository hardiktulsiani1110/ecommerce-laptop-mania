const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology:true
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
