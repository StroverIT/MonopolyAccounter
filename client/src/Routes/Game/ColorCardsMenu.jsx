import React, { useState } from "react";
import Button from "../../Components/Button";
import MoneyStyling from "../../Components/Game/MoneyStyling";

export default function ColorCardsMenu() {
  const data = {
    name: "Emil Zlatinov",
    icon: "Китайски дракон",
    money: { mil: 15, k: 100 },
    upgrade: { mil: 0, k: 500 },
    downgrade: { mil: 0, k: 250 },
    total: 2,
    totalOwn: 1,
    color: "bg-cardColors-brown",
    properties: [
      {
        isOnMortgage: false,
        houses: 0,
        hotel: 0,
        mortgagePrice: { m: 0, k: 300 },
        mortgageReturn: { m: 0, k: 330 },

        name: "Гдиня",

        _id: "1gdinq",
      },
    ],
  };
  const calcTotal =
    data.total == data.totalOwn ? "All" : `${data.totalOwn}/${data.total}`;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-11/12 bg-gray h-5/6">
        <h1 className="text-center">{data.name}</h1>
        <h4 className="text-center">{data.icon}</h4>
        <div className="my-5 text-xs text-gray-100">
          <div>
            Money: <span className="pl-1 text-white">{data.money.mil}M</span>{" "}
            <span className="pl-1 text-white">{data.money.k}k</span>
          </div>
          <div>
            Networth: <span className="text-white">{data.networth}</span>
          </div>
        </div>
        <h1 className="text-center">Card Menu</h1>
        <div className="flex items-center justify-center mt-5">
          <div className={`w-6/12 h-6 ${data.color}`}></div>
          <div>{calcTotal}</div>
        </div>
        <div className="flex justify-between">
          <div>
            <Button>Upgrade</Button>
            <MoneyStyling
              m={data.upgrade.mil}
              k={data.upgrade.k}
              negative={true}
            />
          </div>
          <div>
            <Button>Downgrade</Button>
            <MoneyStyling m={data.downgrade.mil} k={data.downgrade.k} />
          </div>
        </div>
        <div>
          {data.properties.map((property) => {
            return (
              <div key={property._id} className="flex justify-between">
                <div>{property.name}</div>
                {!property.isOnMortgage && (
                  <div>
                    <Button>Ипотекирай</Button>{" "}
                    <MoneyStyling
                      m={property.mortgagePrice.m}
                      k={property.mortgagePrice.k}
                    />
                  </div>
                )}
                {property.isOnMortgage && (
                  <div>
                    <Button>Върни имота</Button>{" "}
                    <MoneyStyling
                      m={property.mortgageReturn.m}
                      k={property.mortgageReturn.k}
                      negative={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
