import React, { useContext, useEffect } from "react";
import { useState } from "react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { useParams } from "react-router-dom";
import Card from "../../Components/Game/Card";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import { SocketContext } from "../../Routes/socketContext";

export default function Main() {
  const userId = window.location.href.toString().split("#")[1];
  let { userId: lobbyId } = useParams();

  const { socket } = useContext(SocketContext);

  const [data, setData] = useState({
    fullName: "Emil Zlatinov",
    role: "player",
    icon: "Китайски Дракон",
    cards: [],
    // rollTurn: 3,
  });
  const cardsVar = data?.cards;
  useEffect(() => {
    socket.on("get-game-user", (res) => {
      console.log("res", res);
      const data = res.user;
      setData(data);
    });
    return () => {
      socket.off("get-game-user");
    };
  }, []);
  useEffect(() => {
    socket.emit("get-game-user-fn", JSON.stringify({ userId, lobbyId }));
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="flex items-center justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div>
            <div className="text-xl text-primary-100 text-bold">
              {data.fullName}
            </div>
            <div className="text-xs text-center text-white">{data.icon}</div>
          </div>
          <div>
            <GrHistory />
          </div>
        </div>
        <div className="my-5 text-xs text-gray-100">
          <MoneyDisplay />
        </div>
        <h3 className="mb-4 text-xl text-center text-primary-100">Cards</h3>
        <div className="grid grid-cols-2 px-2">
          {data.cards.map((card) => {
            return (
              <Card
                bgColor={card?.color}
                total={card?.total}
                ownTotal={card?.totalOwn}
                properties={card?.properties}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
