const { Schema, model } = require("mongoose");

const Card = new Schema({
  total: Number,
  totalOwn: {
    type: Number,
    default: 0,
  },
  color: String,
  upgrade: Number,
  downgrade: Number,
  properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});
