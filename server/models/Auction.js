const { Schema, model } = require("mongoose");

const Auction = new Schema({
  propertyId: { type: Schema.Types.ObjectId, ref: "Property" },
  estimatedTime: Number,

  amountBid: {
    type: Number,
    default: 10000,
  },
  lastBidder: Object,
});
module.exports = model("Auction", Auction);
