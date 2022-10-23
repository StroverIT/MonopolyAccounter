import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import CardMenu from "./CardMenu";

import { GameRouterContext } from "./GameRouterContext";

export default function Menu() {
  const { setRoute, data } = useContext(GameRouterContext);

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(data);
  }, [data]);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="flex items-center justify-between">
          <div
            onClick={() => {
              setRoute("menu");
            }}
          >
            <GiHamburgerMenu />
          </div>
          <div>
            <div className="text-xl text-primary-100 text-bold">
              {user?.fullName}
            </div>
            <div className="text-xs text-center text-white">{user?.icon}</div>
          </div>
          <div>
            <GrHistory />
          </div>
        </div>
        <div className="my-5 text-xs text-gray-100">
          <MoneyDisplay />
        </div>
        <h3 className="mb-4 text-xl text-center text-primary-100">Cards</h3>
        <CardMenu />
      </div>
    </div>
  );
}
