import React, { useContext } from "react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { GameRouterContext } from "../../Routes/Game/GameRouterContext";
import Button from "../Button";

export default function HamburgerMenu() {
  const { setRoute, data } = useContext(GameRouterContext);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <h3 className="text-2xl mt-5 text-primary-100 text-center">Menu</h3>

        <div className="flex flex-col items-center justify-center mt-10 space-y-5 text-xs">
          <Button theme="primary200-white" onClick={() => setRoute("main")}>
            Начало
          </Button>
          <Button theme="primary200-white">Търгуване</Button>
          <Button theme="primary200-white">История</Button>
          {data?.role === "lobbyCreator" && (
            <Button theme="primary-dark" onClick={() => setRoute("adminPanel")}>
              Admin Panel
            </Button>
          )}
          <div className="">
            <div className="mt-36">
              <Button theme="red-white">Откажи се</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
