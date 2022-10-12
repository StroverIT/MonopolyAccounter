import React, { useState } from "react";
// Comoponents
import MoneyDisplay from "../../../Components/Game/MoneyDisplay";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import InputCustomMoney from "../../../Components/Game/InputCustomMoney";
import Button from "../../../Components/Button";
import { format } from "../../../utils/formatter";

const currUser = {
  money: 15000000,
  networth: 15000000,
};
const myTrading = {
  moneyTraded: 100000,
  cardsTraded: [
    {
      name: "Гдиня",
      isOnMortgage: false,
      houses: 0,
      hotel: 0,
      color: "bg-cardColors-brown",
      mortgagePrice: { m: 0, k: 300 },
      mortgageReturn: { m: 0, k: 330 },
      _id: "1gdinq",
    },
  ],
};
const tradingWith = {
  fullName: "Savina Bojilova",
  _id: "1231",
  moneyTraded: 100000,
  cardsTraded: [
    {
      name: "Иван",
      isOnMortgage: false,
      houses: 0,
      hotel: 0,
      mortgagePrice: { m: 0, k: 300 },
      mortgageReturn: { m: 0, k: 330 },
      _id: "1gdinq",
      color: "bg-cardColors-brown",
    },
  ],
};
export default function TradingWith() {
  const [typePrice, setTypePrice] = useState("k");
  const [price, setPrice] = useState(10000);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray h-5/6 w-10/12">
        <div className="flex justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div>
            <h3 className="text-xl text-primary-100">Trading with</h3>
            <div className="pl-1 text-primary">{tradingWith.fullName}</div>
          </div>
          <div className="invisible"></div>
        </div>
        <section className="mt-10 text-lg">
          <MoneyDisplay money={currUser.money} networth={currUser.networth} />
        </section>
        <section className=" bg-gray-100 h-full">
          {/* First col */}
          <div className="px-5 py-2">
            <InputCustomMoney
              price={price}
              setPrice={setPrice}
              typePrice={typePrice}
              setTypePrice={setTypePrice}
            />
            <div className="flex items-center justify-center mt-5 text-sm">
              <Button theme="primary-dark">Добави пари</Button>
            </div>
            <div className="flex items-center justify-center mt-5 text-sm">
              <Button theme="primary-dark">Избери карта</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 border-y  border-primary-200  text-center">
            {/* Me */}
            <div className="py-2 border-r border-primary-200 text-red border-b">
              {format(myTrading.moneyTraded)}
            </div>
            <div className="border-b border-primary-200">
              {myTrading.cardsTraded.map((card) => {
                return (
                  <div
                    key={card._id}
                    className={`${card.color} text-center ${
                      card.isOnMortgage ? "text-red" : "text-bg-color"
                    }`}
                  >
                    {card.name}
                  </div>
                );
              })}
            </div>

            {/* Her/him */}
            <div className="py-2 border-r border-primary-200 text-green">
              {format(tradingWith.moneyTraded)}
            </div>
            <div className="">
              {tradingWith.cardsTraded.map((card) => {
                return (
                  <div
                    key={card._id}
                    className={`${card.color} text-center ${
                      card.isOnMortgage ? "text-red" : "text-bg-color"
                    }`}
                  >
                    {card.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
