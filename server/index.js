const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const http = require("http").Server(app);

app.use(cors());

// Models
const Lobby = require("./models/Lobby");
const User = require("./models/User");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.on("create-lobby", async (data, cb) => {
    const { lobbyName, fullName, icon, socketId } = JSON.parse(data);
    const creator = await User.create({
      fullName,
      icon,
      role: "lobbyCreator",
      socketId,
    });

    const lobby = await Lobby.create({
      creatorId: creator._id,
      lobbyName,
      joinedPlayers: [creator._id],
    });
    socket.join(lobby._id.toString());

    cb({
      lobby,
      creatorId: creator._id,
    });
  });
  socket.on("refresh-lobbies", async (cb) => {
    const lobbies = await Lobby.find({});
    cb({ lobbies });
  });
  socket.on("join-lobby", async (lobbyId, cb) => {
    const lobbyUsers = await Lobby.findOne({ _id: lobbyId }).populate(
      "joinedPlayers"
    );
    cb({
      users: lobbyUsers,
    });
  });
  socket.on("create-user", async (data, cb) => {
    const { fullName, icon, lobbyId, socketId } = JSON.parse(data);

    const user = await User.create({ fullName, icon, socketId });
    const lobby = await Lobby.findOne({ _id: lobbyId }).lean();
    if (lobby.joinedPlayers.length >= 6) {
      cb({
        status: "full",
      });
      return;
    }
    await Lobby.updateOne(
      { _id: lobbyId },
      { $push: { joinedPlayers: user._id } }
    );
    socket.join(lobbyId.toString());
    socket.broadcast.to(lobbyId.toString()).emit("receive-user", {
      user,
    });
    cb({
      status: "ok",
      user,
    });
  });
  socket.on("get-lobbies", async (cb) => {
    const lobbies = await Lobby.find({});
    cb({
      lobbies,
    });
  });
  socket.on("start-game", async (data, cb) => {
    console.log(data);

    const { lobby } = JSON.parse(data);
    await Lobby.updateOne({ _id: lobby }, { $set: { isGameStarted: true } });
    socket.broadcast.to(lobby).emit("change-to-menu", {
      page: `/game/${lobby}`,
    });
    cb({ page: `/game/${lobby}` });
  });
  socket.on("get-lobby-users", async (data, cb) => {
    const { lobbyId } = JSON.parse(data);
    const lobby = await Lobby.findOne({ _id: lobbyId })
      .populate("joinedPlayers")
      .select("joinedPlayers");
    const newLobby = await Lobby.find({});
    cb({
      lobby,
      newLobby,
    });
  });
  socket.on("refresh-money-fn", async (data) => {
    const { lobbyId, userId } = JSON.parse(data);
    const user = await User.findOne({ _id: userId }).select("money networth");
    socket.in(lobbyId.toString()).emit("refresh-money-all", {
      user,
    });
  });
  socket.on("get-game-user", async (data, cb) => {
    const { lobbyId, userId } = JSON.parse(data);
    const user = await User.findOne({ _id: userId }).select("-money -networth");

    cb({
      user,
    });
  });
});

require("dotenv").config();

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
