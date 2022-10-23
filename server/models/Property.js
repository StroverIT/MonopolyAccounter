const { Schema, model } = require("mongoose");

const Property = new Schema({
  type: String,
  color: String,
  name: String,
  mortgagePrice: Number,
  colorToDisplay: String,
  housesBought: {
    type: Number,
    default: 0,
  },
  ownerId: { type: Schema.Types.ObjectId, ref: "User" },
  housePrice: Number,
  priceBuy: Number,
  price: Number,
  oneHouse: Number,
  twoHouses: Number,
  threeHouses: Number,
  fourHouses: Number,
  hotel: Number,
  isOnMortgage: {
    type: Boolean,
    default: false,
  },
  twoTransport: Number,
  threeTransport: Number,
  fourTransport: Number,
});
module.exports = model("Property", Property);
