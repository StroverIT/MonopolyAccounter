import React, { useContext } from "react";
import { format } from "../../utils/formatter";

// Components

import Button from "../../Components/Button";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import { GameRouterContext } from "./GameRouterContext";
import { useParams } from "react-router-dom";
import { SocketContext } from "../socketContext";

const user = {
  fullName: "Emil Z.",
  role: "lobbyCreator",
  icon: "Китайски Дракон",
  money: 15000000,
  networth: 15000000,
};

export default function BuyCardMenu({ data }) {
  const card = data.property;

  const { socket } = useContext(SocketContext);
  const { user, setCardMenu, setRoute } = useContext(GameRouterContext);
  let { userId: lobbyId } = useParams();

  const buyHandler = () => {
    const resData = {
      userId: user._id,
      lobbyId,
      property: card,
      cardId: data.cardId,
    };
    socket.emit("buying-card", JSON.stringify(resData), (res) => {
      console.log(res);
      if (res.message === "okey") {
        setCardMenu({});
        setRoute("main");
      }
    });
  };
  const auctionHandler = () => {
    const sendData = JSON.stringify({
      property: card,
      lobbyId,
      cardId: data.cardId,
    });
    socket.emit("auction-menu-fn", sendData);
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="text-center">
          <h2 className="text-lg text-primary-100">{user.fullName}</h2>
          <h5 className="text-sm text-white">{user.icon}</h5>
        </div>
        <MoneyDisplay />
        <div className="bg-gray-100 ">
          <div
            className={`w-full ${card.colorToDisplay} text-center py-4 text-xl font-bold`}
          >
            {card.name}
          </div>
          <h3 className="my-2 text-center">
            Наем <span className="pl-1">{format(card.price)}</span>
          </h3>
          <div className="px-4 pb-5">
            <div className="flex justify-between">
              <h3>С 1 къща</h3>
              <div className="font-semibold">{format(card.oneHouse)}</div>
            </div>
            <div className="flex justify-between">
              <h3>С 2 къщи</h3>
              <div className="font-semibold">{format(card.twoHouses)}</div>
            </div>
            <div className="flex justify-between">
              <h3>С 3 къщи</h3>
              <div className="font-semibold">{format(card.threeHouses)}</div>
            </div>
            <div className="flex justify-between">
              <h3>С 4 къщи</h3>
              <div className="font-semibold">{format(card.fourHouses)}</div>
            </div>
            <div className="flex justify-between">
              <h3>С ХОТЕЛ</h3>
              <div className="font-semibold">{format(card.hotel)}</div>
            </div>
            <h3 className="mt-2 mb-2 font-semibold text-center">
              Ипотечна стойност {format(card.mortgagePrice)}
            </h3>
            <h3 className="mb-1 text-xs text-center">
              Къщите струват по {format(card.housePrice)} всяка.
            </h3>
            <h3 className="text-xs text-center">
              Хотелите струват по {format(card.housePrice)}, всеки плюс 4 къщи
            </h3>
          </div>
        </div>
        <section className="flex flex-col mt-10 space-y-5">
          <div className="flex flex-col items-center justify-center">
            {/* If not enough money only show auction menu */}
            <Button theme="primary200-white" onClick={buyHandler}>
              Купи
            </Button>
            <div className="text-red">-{format(card.priceBuy)}</div>
          </div>
          <div
            className="flex items-center justify-center"
            onClick={auctionHandler}
          >
            <Button theme="primary200-white">На ТЪРГ</Button>
          </div>
        </section>
      </div>
    </section>
  );
}
