import React from "react";
import { useState } from "react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import Card from "../../Components/Game/Card";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";

export default function Main() {
  const [data, setData] = useState({
    name: "Emil Zlatinov",
    role: "player",
    icon: "Китайски Дракон",
    money: 15000000,
    networth: 15000000,
    // rollTurn: 3,
    cards: [
      {
        total: 2,
        totalOwn: 1,
        color: "bg-cardColors-brown",
        upgrade: { mil: 0, k: 500 },
        downgrade: { mil: 0, k: 250 },
        _id: "1Brown",
        properties: [
          {
            houses: 0,
            hotel: 0,
            name: "Гдиня",

            _id: "1gdinq",
          },
        ],
      },
      {
        total: "3",
        totalOwn: "2",
        color: "bg-cardColors-lightBlue",
        _id: "123",
        properties: [
          {
            houses: 0,
            hotel: 0,
            name: "Гдиня",
            _id: "2131",
          },
        ],
      },
    ],
  });
  const cardsVar = data?.cards;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="flex items-center justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div>
            <div className="text-xl text-primary-100 text-bold">
              {data.name}
            </div>
            <div className="text-xs text-center text-white">{data.icon}</div>
          </div>
          <div>
            <GrHistory />
          </div>
        </div>
        <div className="my-5 text-xs text-gray-100">
          <MoneyDisplay />
        </div>
        <h3 className="mb-4 text-xl text-center text-primary-100">Cards</h3>
        <div className="grid grid-cols-2 px-2">
          {data.cards.map((card) => {
            return (
              <Card
                bgColor={card.color}
                total={card.total}
                ownTotal={card.totalOwn}
                properties={card.properties}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
