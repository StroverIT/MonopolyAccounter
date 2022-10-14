const { Schema, model } = require("mongoose");

const Lobby = new Schema({
  joinedPlayers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  lobbyName: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  isGameStarted: { type: Boolean, default: false },
});

module.exports = model("Lobby", Lobby);
