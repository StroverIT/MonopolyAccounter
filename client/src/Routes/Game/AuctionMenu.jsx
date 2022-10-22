import React, { useEffect, useState } from "react";
import { format } from "../../utils/formatter";

// Components
import Button from "../../Components/Button";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import usePrevious from "../../utils/usePrevious";
import InputCustomMoney from "../../Components/Game/InputCustomMoney";
import { useContext } from "react";
import { SocketContext } from "../socketContext";
import { GameRouterContext } from "./GameRouterContext";
import { Navigate, useParams } from "react-router-dom";

const getLastingSeconds = (seconds) => {
  const currentTime = new Date();

  const time = new Date(seconds);

  const delta = (time - currentTime) / 1000;
  return delta;
};
export default function AuctionMenu({ cardData, auction }) {
  const { property, cardId } = cardData;
  const { socket } = useContext(SocketContext);
  const { data, setRoute, setAuction, setCardShow } =
    useContext(GameRouterContext);
  let { userId: lobbyId } = useParams();

  const [typePrice, setTypePrice] = useState("k");
  const [price, setPrice] = useState(10);

  const [priceBid, setPriceBid] = useState(10000);
  const [time, setTime] = useState(getLastingSeconds(auction.estimatedTime));
  const [winner, setWiner] = useState(null);

  const bidHandler = () => {
    const sendData = JSON.stringify({
      typePrice,
      price,
      user: data,
      lobbyId,
      auction,
    });
    socket.emit("auction-bid", sendData);
  };
  useEffect(() => {
    socket.on("auction-bid-refresh", (data) => {
      const { auctionData } = data;
      setWiner(auctionData.lastBidder);
      setPriceBid(auctionData.amountBid);
    });
    let interval;
    if (time > 0) {
      interval = setInterval(() => {
        const getLastedTime = getLastingSeconds(auction.estimatedTime);
        setTime(getLastedTime);
      }, 1000);
    }

    return () => {
      socket.off("auction-refresh-time");

      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (time <= 0) {
      const resData = JSON.stringify({
        winner,
        property,
        auction,
        cardId,
        user: data,
      });
      console.log("prikychi vremeto");
      socket.emit("auction-winner", resData, (res) => {
        if (res.message === "success") {
          setRoute("main");
          setAuction(null);
          setCardShow(null);
        }
      });
    }
  }, [time]);

  const colorsDic = (seconds) => {
    if (seconds >= 15) return "bg-green";
    else if (seconds < 15 && seconds >= 10) return "bg-yellow";
    else if (seconds > 5 && seconds < 10) return "bg-red";
    else if (seconds <= 5 && seconds > 0) return "bg-red-animated";
    else if (seconds <= 0) return "finished";
  };
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="text-center">
          <h2 className="text-lg text-primary-100">{data.fullName}</h2>
          <h5 className="text-sm text-white">{data.icon}</h5>
        </div>
        <MoneyDisplay />
        <div className="flex items-center justify-center">
          <div className={`${colorsDic(time)} w-6  h-6 rounded-full`}></div>
        </div>
        <div className="text-white text-xs">
          Заложена цена:
          <span className="pl-1 text-primary">{format(priceBid)}</span>
        </div>
        <div className="text-white">
          Последно заложил:
          <span className="pl-1 text-primary">
            {winner?.fullName ? winner?.fullName : "Никой"}
          </span>
        </div>
        <div className="text-white mt-2 mb-4">
          Цена на имота:
          <span className="pl-1 text-primary">{format(property.priceBuy)}</span>
        </div>

        <InputCustomMoney
          typePrice={typePrice}
          setTypePrice={setTypePrice}
          setPrice={setPrice}
          price={price}
        />
        <div className="flex items-center justify-center mt-5">
          <Button theme="primary-dark" onClick={bidHandler}>
            Заложи
          </Button>
        </div>

        {/* Card */}
        <div className="px-4 mt-5">
          <div className="bg-gray-100">
            <div
              className={`w-full ${property.colorToDisplay} text-center py-4 text-xl font-bold`}
            >
              {property.name}
            </div>
            <h3 className="my-2 text-center">
              Наем <span className="pl-1">{format(property.price)}</span>
            </h3>
            <div className="px-4 pb-5">
              <div className="flex justify-between">
                <h3>С 1 къща</h3>
                <div className="font-semibold">{format(property.oneHouse)}</div>
              </div>
              <div className="flex justify-between">
                <h3>С 2 къщи</h3>
                <div className="font-semibold">
                  {format(property.twoHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С 3 къщи</h3>
                <div className="font-semibold">
                  {format(property.threeHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С 4 къщи</h3>
                <div className="font-semibold">
                  {format(property.fourHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С ХОТЕЛ</h3>
                <div className="font-semibold">{format(property.hotel)}</div>
              </div>
              <h3 className="mt-5 mb-2 font-semibold text-center">
                Ипотечна стойност {format(property.mortgagePrice)}
              </h3>
              <h3 className="mb-1 mt-1 text-xs text-center">
                Къщите струват по {format(property.housePrice)} всяка.
              </h3>
              <h3 className="text-xs mt-1 text-center">
                Хотелите струват по {format(property.housePrice)}, всеки плюс 4
                къщи
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
