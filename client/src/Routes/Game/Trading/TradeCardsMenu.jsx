import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Card from "../../../Components/Game/Card";
import MoneyDisplay from "../../../Components/Game/MoneyDisplay";

const currUser = {
  money: 15000000,
  networth: 15000000,
};
const tradingWith = { fullName: "Savina Bojilova", _id: "1231" };
const cards = [
  {
    total: 2,
    totalOwn: 1,
    color: "bg-cardColors-brown",
    upgrade: 500000,
    downgrade: 250000,
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
    total: 3,
    totalOwn: 2,
    upgrade: 500000,
    downgrade: 250000,
    color: "bg-cardColors-lightBlue",
    _id: "123",
    properties: [
      {
        houses: 4,
        hotel: 0,
        name: "Гдиня",
        _id: "213112",
      },
      {
        houses: 0,
        hotel: 1,
        name: "Иван",
        _id: "2131412",
      },

      {
        houses: 1,
        hotel: 0,
        name: "Петър",
        _id: "1241",
      },
    ],
  },
];

export default function TradeCardsMenu() {
  return (
    <section className="h-screen flex justify-center items-center">
      <section className="bg-gray w-10/12 h-5/6">
        <div className="flex justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div className="">
            <h3 className="text-xl text-primary-100">Trading with</h3>
            <h3 className="text-primary">{tradingWith.fullName}</h3>
          </div>
          <div className="invisible"></div>
        </div>
        <section className="mt-10 text-lg">
          <MoneyDisplay money={currUser.money} networth={currUser.networth} />
        </section>
        <section>
          <div className="grid grid-cols-2">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  bgColor={card.color}
                  total={card.total}
                  ownTotal={card.totalOwn}
                  properties={card.properties}
                  downgrade={card.downgrade}
                />
              );
            })}
          </div>
        </section>
      </section>
    </section>
  );
}
