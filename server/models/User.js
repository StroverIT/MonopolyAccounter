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
  currentIndex: {
    type: Number,
    default: 0,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  index: {
    type: Number,
    default: 0,
  },
});

module.exports = model("User", User);
