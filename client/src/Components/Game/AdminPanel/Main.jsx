import React, { useContext, useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { GameRouterContext } from "../../../Routes/Game/GameRouterContext";
import { SocketContext } from "../../../Routes/socketContext";
import User from "./User";

export default function Main({ setUserMenu, setRoute: setRoutePanel }) {
  const { socket } = useContext(SocketContext);
  const { setRoute } = useContext(GameRouterContext);

  let { userId: lobbyId } = useParams();

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    socket.emit("get-lobby-users", JSON.stringify({ lobbyId }), (res) => {
      console.log("res", res);
      const { users } = res;
      setAllUsers(users.joinedPlayers);
    });
  }, []);
  return (
    <div className="h-full flex items-center justify-center ">
      <div className="h-5/6 w-10/12 bg-gray relative pb-10 pt-5">
        <div className="px-5 flex  items-center">
          <div
            className="mr-auto "
            onClick={() => {
              setRoute("menu");
            }}
          >
            <GiHamburgerMenu />
          </div>
          <h3 className="mr-auto text-primary-100 text-xl">Admin Panel</h3>
        </div>
        <div className="grid grid-cols-2">
          {allUsers.map((player) => {
            return (
              <User
                player={player}
                key={player._id}
                setUserMenu={setUserMenu}
                setRoutePanel={setRoutePanel}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
