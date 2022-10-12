const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  origin: "http:/localhost:3000",
});

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection Succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

http.listen(process.env.PORT || 8080, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

// const io = socket(server, {
//   cors: {
//     origin: "http:/localhost:3000",
//     credentials: true,
//   },
// });
