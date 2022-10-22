import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameRouterContext } from "../../../Routes/Game/GameRouterContext";
import { SocketContext } from "../../../Routes/socketContext";

export default function User({ player, setUserMenu, setRoutePanel }) {
  const { socket } = useContext(SocketContext);
  const { setRoute, setCardMenu } = useContext(GameRouterContext);
  let { userId: lobbyId } = useParams();

  const [data, setData] = useState({
    index: "",
    removeIndex: "",
  });
  const inputHandler = (e) => {
    setData((prvState) => ({
      ...prvState,
      [e.target.name]: e.target.value,
    }));
  };
  const handler = () => {
    setUserMenu(player);
    setRoutePanel("user");
  };
  const changeIndexHandler = (type) => {
    const sendData = {
      userId: player._id,
      lobbyId,
      typeAction: type,
    };
    if (type === "add") sendData.index = data.index;
    else if (type === "remove") sendData.index = data.removeIndex;
    socket.emit("change-index-func", JSON.stringify(sendData));
  };

  return (
    <div key={player._id}>
      <div className="text-center" onClick={handler}>
        <div
          className={`text-lg ${
            player.role === "lobbyCreator" ? "text-primary" : "text-white"
          }`}
        >
          {player.fullName}
        </div>
        <div className="text-sm">{player.icon}</div>
      </div>
      {/* buttons */}

      <div className="text-sm mt-10">
        <div className="flex items-center justify-between flex-col space-y-5">
          <div className="flex">
            <div>
              <input
                type="text"
                name="index"
                className="w-28 py-2 text-center"
                value={data.index}
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="w-full ">
            <button
              className="w-full  py-2 rounded-full primary200-white"
              onClick={() => changeIndexHandler("add")}
            >
              Добави индекс
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between flex-col space-y-5 mt-2">
          <div className="flex ">
            <input
              type="text"
              name="removeIndex"
              className="text-center w-28 py-2"
              value={data.removeIndex}
              onChange={inputHandler}
            />
          </div>
          <div className="w-full ">
            <button
              className="w-full  py-2 rounded-full primary200-white"
              onClick={() => changeIndexHandler("remove")}
            >
              Премахни индекс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
