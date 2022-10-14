import React, { useEffect, useState } from "react";
import { format } from "../../utils/formatter";

// Components
import Button from "../../Components/Button";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";

// Icons
import { MdKeyboardArrowDown } from "react-icons/md";
import usePrevious from "../../utils/usePrevious";
import InputCustomMoney from "../../Components/Game/InputCustomMoney";

const user = {
  fullName: "Emil Z.",
  role: "lobbyCreator",
  icon: "Китайски Дракон",
  money: 15000000,
  networth: 15000000,
};
const cardForBuying = {
  name: "ТАЙПЕ",
  color: "bg-cardColors-brown",
  cardPrice: 600000,
  naem: 40000,
  oneHouse: 200000,
  twoHouses: 600000,
  threeHouses: 1800000,
  fourHouses: 3200000,
  oneHotel: 4500000,
  mortgagePrice: 300000,
  housePrice: 500000,
};
const auction = {
  estimatedTime: 10,
  priceOnTable: 10000,
  winner: { name: "Emil Z." },
};

export default function AuctionMenu() {
  const [typePrice, setTypePrice] = useState("k");
  const [price, setPrice] = useState(10000);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="text-center">
          <h2 className="text-lg text-primary-100">{user.fullName}</h2>
          <h5 className="text-sm text-white">{user.icon}</h5>
        </div>
        <MoneyDisplay />
        <div className="flex justify-between px-2">
          <div className="text-white text-xs">
            Заложена цена:
            <span className="pl-1 text-primary">
              {format(auction.priceOnTable)}
            </span>
          </div>
          <div className="text-white text-sm">
            време:
            <span className="pl-1 text-primary">{auction.estimatedTime} s</span>
          </div>
        </div>
        <div className="flex justify-between px-2 text-xs">
          <div className="text-white">
            Последно заложил:
            <span className="pl-1 text-primary">{auction.winner.name}</span>
          </div>
          <div className="text-white">
            Цена на имота:
            <span className="pl-1 text-primary">
              {format(cardForBuying.cardPrice)}
            </span>
          </div>
        </div>
        <InputCustomMoney
          typePrice={typePrice}
          setTypePrice={setTypePrice}
          setPrice={setPrice}
          price={price}
        />
        <div className="flex items-center justify-center mt-5">
          <Button theme="primary-dark">Заложи</Button>
        </div>

        {/* Card */}
        <div className="px-4 mt-5">
          <div className="bg-gray-100">
            <div
              className={`w-full ${cardForBuying.color} text-center py-4 text-xl font-bold`}
            >
              {cardForBuying.name}
            </div>
            <h3 className="my-2 text-center">
              Наем <span className="pl-1">{format(cardForBuying.naem)}</span>
            </h3>
            <div className="px-4 pb-5">
              <div className="flex justify-between">
                <h3>С 1 къща</h3>
                <div className="font-semibold">
                  {format(cardForBuying.oneHouse)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С 2 къщи</h3>
                <div className="font-semibold">
                  {format(cardForBuying.twoHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С 3 къщи</h3>
                <div className="font-semibold">
                  {format(cardForBuying.threeHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С 4 къщи</h3>
                <div className="font-semibold">
                  {format(cardForBuying.fourHouses)}
                </div>
              </div>
              <div className="flex justify-between">
                <h3>С ХОТЕЛ</h3>
                <div className="font-semibold">
                  {format(cardForBuying.oneHotel)}
                </div>
              </div>
              <h3 className="mt-5 mb-2 font-semibold text-center">
                Ипотечна стойност {format(cardForBuying.mortgagePrice)}
              </h3>
              <h3 className="mb-1 mt-1 text-xs text-center">
                Къщите струват по {format(cardForBuying.housePrice)} всяка.
              </h3>
              <h3 className="text-xs mt-1 text-center">
                Хотелите струват по {format(cardForBuying.housePrice)}, всеки
                плюс 4 къщи
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
