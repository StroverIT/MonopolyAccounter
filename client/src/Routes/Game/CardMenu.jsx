import React, { useContext, useState, useEffect } from "react";
import Card from "../../Components/Game/Card";
import { SocketContext } from "../socketContext";
import { GameRouterContext } from "./GameRouterContext";

export default function CardMenu() {
  const { socket } = useContext(SocketContext);
  const { data } = useContext(GameRouterContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    socket.on("refresh-cards", (res) => {
      console.log("refresh-cards", res);

      const cards = res.cards.cards;

      setCards(cards);
    });
    socket.emit("refresh-cards", data._id, (res) => {
      console.log(res);
      const cards = res?.cards?.cards;
      if (cards) {
        setCards(cards);
      }
    });
    return () => {
      socket.off("refresh-cards");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="grid grid-cols-2 px-2">
      {cards?.map((card) => {
        return <Card data={card} />;
      })}
    </div>
  );
}
