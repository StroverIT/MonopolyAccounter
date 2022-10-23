const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const http = require("http").Server(app);

app.use(cors());

// Models
const Lobby = require("./models/Lobby");
const User = require("./models/User");
const Card = require("./models/Card");
const Property = require("./models/Property");
const Auction = require("./models/Auction");

const { cards, properties } = require("./cards");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id); // x8WIv7-mJelg7on_ALbx

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
    socket.join(creator._id.toString());

    cb({
      lobby,
      creatorId: creator._id,
    });
  });
  socket.on("refresh-lobbies", async (cb) => {
    const lobbies = await Lobby.find({});
    cb({ lobbies });
  });
  socket.on("join-lobby", async (data) => {
    const { userId, lobbyId } = JSON.parse(data);

    socket.join(userId.toString());
    socket.join(lobbyId.toString());
  });
  socket.on("get-user-data", async (data, cb) => {
    const { userId, lobbyId } = JSON.parse(data);
    const user = await User.findOne({ _id: userId });

    cb({ user });
  });
  socket.on("get-lobby-users", async (data, cb) => {
    const { lobbyId } = JSON.parse(data);

    const users = await Lobby.findOne({ _id: lobbyId })
      .populate("joinedPlayers")
      .select("joinedPlayers");
    cb({ users });
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
    socket.join(user._id.toString());

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
  socket.on("start-game", async (data) => {
    const { lobby } = JSON.parse(data);
    await Lobby.updateOne({ _id: lobby }, { $set: { isGameStarted: true } });
    io.in(lobby).emit("change-to-menu", {
      page: `/game/${lobby}`,
    });

    const users = await Lobby.findOne({ _id: lobby })
      .populate("joinedPlayers")
      .select("joinedPlayers");
    // io.in(lobby).emit("game-init", users);
  });

  socket.on("money-init", async (data, cb) => {
    const { userId } = JSON.parse(data);

    const user = await User.findOne({ _id: userId }).select("money networth");
    cb({
      money: user,
    });
  });

  socket.on("money-handler", async (data) => {
    let { userId, lobbyId, money, moneyType, typeAction } = JSON.parse(data);
    if (moneyType == "k") {
      money = money * 1000;
    } else if (moneyType == "m") {
      money = money * 1000000;
    }
    const user = await User.findOne({ _id: userId });
    if (typeAction == "add") {
      await User.updateOne(
        { _id: user },
        { $set: { money: user.money + money, networth: user.networth + money } }
      );
    } else if (typeAction == "remove") {
      await User.updateOne(
        { _id: user },
        { $set: { money: user.money - money, networth: user.networth - money } }
      );
    }

    const users = await Lobby.findOne({ _id: lobbyId })
      .populate("joinedPlayers")
      .select("joinedPlayers");
    io.in(lobbyId).emit("refresh-money", { users });
  });
  socket.on("change-index-func", async (data) => {
    const { userId, lobbyId, index, typeAction } = JSON.parse(data);
    // getting user for prev index
    console.log(socket.rooms);

    const user = await User.findOne({ _id: userId });
    const userIndex = user.index;
    const getCard = properties[index];

    const cardFather = cards.find((card) => card.color == getCard.color);
    // Add index

    // Remove index

    // Set index

    /* Getting card*/

    /*
     If card is taken
     - Get money from stepped on user
     - Give data to the owner (increase money and networth)
    - If is taxed
    - if is go to jail card
     */

    // If card is not taken, send for buying

    getCard.housePrice = cardFather.upgrade;
    getCard.colorToDisplay = cardFather.colorToDisplay;

    const property = await Property.create(getCard);
    const isCreated = await Card.findOne({
      ownerId: userId,
      color: property.color,
    });
    let cardId;
    if (!isCreated) {
      const cardNew = await Card.create(cardFather);
      cardId = cardNew._id;
    } else {
      cardId = isCreated._id;
    }
    io.in(userId).emit("change-index", {
      property,
      userId,
      cardId,
    });
  });
  socket.on("buying-card", async (data, cb) => {
    // Getting data from client
    const { userId, lobbyId, property, cardId } = JSON.parse(data);

    const card = await Card.findOne({ _id: cardId });
    // If property is not bought
    if (!card.ownerId || card.ownerId == userId) {
      await Card.updateOne(
        { _id: cardId },
        {
          $set: { ownerId: userId },
          $push: { properties: property },
          $inc: { totalOwn: 1 },
        }
      );
      await User.updateOne(
        { _id: userId },
        {
          $inc: {
            money: -property.priceBuy,
            networth: -property.mortgagePrice,
          },
          $addToSet: { cards: cardId },
        }
      );
    } else if (card.ownerId != userId) {
      const card = await Card.create({
        total: card.total,
        colorToDisplay: card.colorToDisplay,
        totalOwn: 1,
        ownerId: userId,
        upgrade: card.upgrade,
        downgrade: card.downgrade,
        properties: [property._id],
      });
      await User.updateOne(
        { _id: userId },
        {
          $inc: {
            money: -property.priceBuy,
            networth: -property.mortgagePrice,
          },
          $addToSet: { cards: card._id },
        }
      );
    }

    // Updating the user money

    // Get lobby users

    cb({ message: "okey" });
  });
  socket.on("refresh-cards", async (userId, cb) => {
    const cards = await User.findOne({ _id: userId })
      .populate({
        path: "cards",
        populate: {
          path: "properties",
          model: "Property",
        },
      })
      .select("cards");
    cb({ cards });
  });
  socket.on("upgrade-house", async (data, cb) => {
    const { userId, propertyId, cardId } = JSON.parse(data);

    await Property.updateOne(
      { _id: propertyId },
      { $inc: { housesBought: 1 } }
    );

    const cards = await Card.findOne({ _id: cardId }).populate("properties");
    // Get money from user
    await User.updateOne(
      { _id: userId },
      { $inc: { money: -cards.upgrade, networth: -cards.upgrade } }
    );
    const user = await User.findOne({ _id: userId }).select("money networth");
    io.in(userId).emit("refresh-money", { user });
    cb({
      data: cards,
    });
  });
  socket.on("downgrade-house", async (data, cb) => {
    const { userId, propertyId, cardId } = JSON.parse(data);

    await Property.updateOne(
      { _id: propertyId },
      { $inc: { housesBought: -1 } }
    );

    const cards = await Card.findOne({ _id: cardId }).populate("properties");
    // Give money to user
    await User.updateOne(
      { _id: userId },
      { $inc: { money: cards.downgrade, networth: cards.downgrade } }
    );
    const user = await User.findOne({ _id: userId }).select("money networth");
    io.in(userId).emit("refresh-money", { user });
    cb({
      data: cards,
    });
  });
  socket.on("mortgage", async (data, cb) => {
    const { userId, propertyId, cardId, action } = JSON.parse(data);

    const property = await Property.findOne({ _id: propertyId }).select(
      "mortgagePrice"
    );

    const isMortgage = action == "mortgage" ? true : false;

    await Property.updateOne(
      { _id: propertyId },
      { $set: { isOnMortgage: isMortgage } }
    );
    if (isMortgage) {
      const price = property.mortgagePrice;
      await User.updateOne(
        { _id: userId },
        {
          $inc: {
            money: price,
            networth: price,
          },
        }
      );
    }
    if (!isMortgage) {
      const price = property.mortgagePrice * 1.1;
      await User.updateOne(
        { _id: userId },
        {
          $inc: {
            money: -price,
            networth: -price,
          },
        }
      );
    }
    const cards = await Card.findOne({ _id: cardId }).populate("properties");
    const user = await User.findOne({ _id: userId }).select("money networth");
    io.in(userId).emit("refresh-money", { user });
    cb({
      cards,
    });
  });
  socket.on("auction-menu-fn", async (data, cb) => {
    const { lobbyId, property, cardId } = JSON.parse(data);

    const randomNum = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

    const date = Date.now() + randomNum * 1000;

    const auction = await Auction.create({
      propertyId: property.id,
      estimatedTime: randomNum,
      lastBidder: "Никой",
      estimatedTime: date,
    });
    io.in(lobbyId).emit("auction-menu", { property, auction, cardId });
  });
  socket.on("auction-bid", async (data) => {
    const { lobbyId, price, typePrice, user, auction } = JSON.parse(data);
    let money = price;
    if (typePrice == "k") {
      money = money * 1000;
    } else if (typePrice == "m") {
      money = money * 1000000;
    }
    await Auction.updateOne(
      { _id: auction._id },
      { $inc: { amountBid: money }, $set: { lastBidder: user } }
    );
    const auctionData = await Auction.findOne({ _id: auction._id });
    io.in(lobbyId.toString()).emit("auction-bid-refresh", {
      auctionData,
    });
  });
  socket.on("auction-winner", async (data, cb) => {
    const { winner, property, auction, cardId } = JSON.parse(data);
    const auctionData = await Auction.findOne({ _id: auction._id });
    if (!auctionData) return cb({ message: "success" });

    // Get money from the user
    await User.updateOne(
      { _id: winner._id },
      {
        $inc: {
          money: -auctionData.amountBid,
          networth: property.mortgagePrice - auctionData.amountBid,
        },
      }
    );
    // If not enough send for selling menu

    const card = await Card.findOne({ _id: cardId });

    if (!card.ownerId) {
      await Card.updateOne(
        { _id: cardId },
        {
          $set: { ownerId: winner._id },
          $push: { properties: property._id },
          $inc: { totalOwn: 1 },
        }
      );
      await User.updateOne(
        { _id: winner._id },
        { $addToSet: { cards: card._id } }
      );
    } else if (card.ownerId == winner._id) {
      await Card.updateOne(
        { ownerId: winner._id },
        { $push: { properties: property } }
      );
    } else if (card.ownerId != winner._id) {
      const newCard = await Card.create({
        total: card.total,
        colorToDisplay: card.colorToDisplay,
        totalOwn: 1,
        ownerId: winner._id,
        upgrade: card.upgrade,
        downgrade: card.downgrade,
        properties: [property._id],
      });
      await User.updateOne(
        { _id: winner._id },
        { $addToSet: { cards: newCard._id } }
      );
    }
    await Auction.deleteOne({ _id: auction._id });
    cb({ message: "success" });
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
