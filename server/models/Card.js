const { Schema, model } = require("mongoose");

const Card = new Schema({
  total: Number,
  colorToDisplay: String,
  totalOwn: {
    type: Number,
    default: 0,
  },
  color: String,
  upgrade: Number,
  downgrade: Number,
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },

  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

module.exports = model("Card", Card);
