import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import MoneyDisplay from "../../../Components/Game/MoneyDisplay";

const users = [
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "lobbyCreator",
    _id: "ivan",
  },
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "player",
    _id: "ivan1",
  },
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "player",
    _id: "ivan2",
  },
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "player",
    _id: "ivan21",
  },
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "player",
    _id: "ivan1231",
  },
  {
    fullName: "Emil Z.",
    icon: "Китайски Дракон",
    role: "player",
    _id: "ivan412",
  },
];
const currUser = {
  money: 15000000,
  networth: 15000000,
};
export default function TradeMenu() {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="h-5/6 w-10/12 bg-gray px-2 py-5">
        <div className="flex justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div>
            <h3 className="text-xl text-primary-100">Trade Menu</h3>
          </div>
          <div className="invisible"></div>
        </div>
        <section className="mt-10 text-lg">
          <MoneyDisplay money={currUser.money} networth={currUser.networth} />
        </section>
        <hr className=" text-primary-200" />
        <section className="grid grid-cols-2  mt-10">
          {users.map((user) => {
            return (
              <div key={user._id} className="text-center mt-5">
                <h3
                  className={`
                  text-lg ${
                    user.role == "lobbyCreator" ? "text-primary" : "text-white"
                  }`}
                >
                  {user.fullName}
                </h3>
                <h5 className=" text-gray-100 text-xs">{user.icon}</h5>
              </div>
            );
          })}
        </section>
      </div>
    </section>
  );
}
