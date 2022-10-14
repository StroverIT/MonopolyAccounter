const { Schema, model } = require("mongoose");

const Property = new Schema({
  houses: {
    type: Number,
    default: 0,
  },
  hotel: {
    type: Number,
    default: 0,
  },
  name: String,

  isOnMortgage: {
    type: Boolean,
    default: false,
  },
  mortgagePrice: Number,
  mortgageReturn: Number,
});
