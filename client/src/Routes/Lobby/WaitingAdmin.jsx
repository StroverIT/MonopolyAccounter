import React, { useState } from "react";
import { GrReturn } from "react-icons/gr";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";

export default function WaitingAdmin() {
  const [users, setUsers] = useState([
    { name: "Emil Zlatinov", role: "lobbyCreator", icon: "Шапка", _id: 212312 },
    {
      name: "Savi Bojilova",
      role: "player",
      icon: "Китайски Дракон",
      _id: 51251,
    },
    { name: "My Doggy", role: "player", icon: "Кенгуру", _id: 5363121 },
    { name: "Pepi Petrov", role: "player", icon: "Статуя", _id: 21516126 },
    { name: "Kirilica Petrova", role: "player", icon: "Кола", _id: 713 },
    { name: "My aunt", role: "player", icon: "Сумо борец", _id: 2 },
  ]);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-10/12 bg-gray h-5/6 ">
        <div className="h-full">
          <div className="flex items-center justify-center px-4 pt-5 pb-2">
            <Link to="/lobby" className="mr-auto text-primary-100">
              <GrReturn />
            </Link>
            <h1 className="mr-auto text-xl text-center text-primary-100">
              Waiting for players...
            </h1>
          </div>
          <div className="  text-xl text-gray-100 text-center ">
            {users.length}/6
          </div>
          <div className=" ">
            <div className="px-2 mt-5  ">
              {users.map((user) => {
                return (
                  <div className="flex justify-between" key={user._id}>
                    <div>
                      <div
                        className={`text-lg ${
                          user.role === "player"
                            ? "text-gray-100"
                            : "text-primary"
                        }`}
                      >
                        {user.name}
                      </div>
                      <div className="text-xs  text-primary-200 text-center">
                        {user.icon}
                      </div>
                    </div>
                    <div className="">
                      <input name="place" className="w-10 text-center" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="items-center justify-center flex  mt-56 ">
            <Button theme="primary200-white">Start game</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
