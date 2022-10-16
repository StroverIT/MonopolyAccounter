import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { format } from "../../utils/formatter";

import { SocketContext } from "../../Routes/socketContext";
import { useParams } from "react-router-dom";

export default function MoneyDisplay() {
  const userId = window.location.href.toString().split("#")[1];
  let { userId: lobbyId } = useParams();

  const { socket } = useContext(SocketContext);

  const [data, setData] = useState({
    money: 0,
    networth: 0,
  });

  useEffect(() => {
    socket.on("refresh-money", (res) => {
      console.log("money", res);
      const users = res.users.joinedPlayers;
      const found = users.find((user) => user._id.toString() === userId);
      if (found) {
        setData({ money: found.money, networth: found.networth });
      }
    });
    const data = JSON.stringify({ userId });

    socket.emit("money-init", data, (res) => {
      const money = res.money;
      setData(money);
    });

    return () => {
      socket.off("refresh-money");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5 text-gray-100">
      <div>
        Money: <span className="pl-1 text-white">{format(data.money)}</span>
      </div>
      <div>
        Networth:{" "}
        <span className="pl-1 text-white">{format(data.networth)}</span>
      </div>
    </div>
  );
}
