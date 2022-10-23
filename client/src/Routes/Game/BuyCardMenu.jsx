import React, { useContext } from "react";
import { format } from "../../utils/formatter";

// Components

import Button from "../../Components/Button";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import { GameRouterContext } from "./GameRouterContext";
import { useParams } from "react-router-dom";
import { SocketContext } from "../socketContext";
import PropertyCard from "../../Components/Game/Cards/Property";
import TransportCard from "../../Components/Game/Cards/Transport";
import PowerPlant from "../../Components/Game/Cards/PowerPlant";

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
        {card.type === "property" && <PropertyCard card={card} />}
        {card.type === "transport" && <TransportCard card={card} />}
        {card.type === "power_plant" && <PowerPlant card={card} />}

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
