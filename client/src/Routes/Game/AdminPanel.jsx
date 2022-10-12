import React from "react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../../Components/Button";

export default function AdminPanel() {
  const players = [
    {
      fullName: "Emil Z.",
      icon: "Шапка",
      role: "lobbyCreator",
      _id: 1231,
      money: { mil: 15, k: 0 },
      networth: { mil: 15, k: 0 },
    },
  ];
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-5/6 w-10/12 bg-gray relative">
        <div className="px-5 flex  items-center">
          <div className="mr-auto ">
            <GiHamburgerMenu />
          </div>
          <h3 className="mr-auto text-primary-100 text-xl">Admin Panel</h3>
        </div>
        <div className="">
          {players.map((player) => {
            return (
              <div key={player._id}>
                <div className="text-center">
                  <div
                    className={`text-lg ${
                      player.role === "lobbyCreator"
                        ? "text-primary"
                        : "text-white"
                    }`}
                  >
                    {player.fullName}
                  </div>
                  <div className="text-sm">{player.icon}</div>
                </div>
                <div className="flex flex-col space-y-4 mt-5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <div>
                        <input
                          type="text"
                          className="w-6 text-center"
                          defaultValue="1"
                          id="m"
                        />
                        <span className="pl-1  text-primary">M</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-8 text-center"
                          defaultValue="100"
                          id="k"
                        />
                        <span className="pl-1  text-primary">k</span>
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Добави пари
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <div>
                        <input
                          type="text"
                          className="w-6 text-center"
                          defaultValue="1"
                          id="m"
                        />
                        <span className="pl-1  text-primary">M</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          className="w-8 text-center"
                          defaultValue="100"
                          id="k"
                        />
                        <span className="pl-1  text-primary">k</span>
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Вземи пари
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <div>
                        <input
                          type="text"
                          className="w-8 text-center"
                          defaultValue="100"
                          id="k"
                        />
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Добави индекс
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <div>
                        <input
                          type="text"
                          className="w-8 text-center"
                          defaultValue="100"
                          id="k"
                        />
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Премахни индекс
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <div>
                        <input
                          type="text"
                          className="w-6 text-center"
                          defaultValue="1"
                          id="m"
                        />
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Сложи на индекс
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-full px-5">
                      <button className="w-full  py-2 rounded-full primary200-white">
                        Банкрутирай
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
