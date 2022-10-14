const { Schema, model } = require("mongoose");

const User = new Schema({
  fullName: String,
  icon: String,
  role: {
    type: String,
    enum: ["player", "lobbyCreator"],
    default: "player",
  },
  socketId: String,
  money: {
    type: Number,
    default: 15000000,
  },
  networth: {
    type: Number,
    default: 15000000,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = model("User", User);
