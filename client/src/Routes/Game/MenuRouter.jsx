import React, { useContext, useEffect } from "react";
import { useState } from "react";

// Components
import Menu from "./Menu";
import ColorCardsMenu from "./ColorCardsMenu";
import AdminPanel from "./AdminPanel";
import HamburgerMenu from "./../../Components/Game/HamburgerMenu";
import BuyCardMenu from "./BuyCardMenu";
import AuctionMenu from "./AuctionMenu";
import TradeMenu from "./Trading/TradeMenu";
import TradingWith from "./Trading/TradingWith";
import TradeCardsMenu from "./Trading/TradeCardsMenu";
import LogsMenu from "./LogsMenu";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import { SocketContext } from "../socketContext";
import { GameRouterContext } from "./GameRouterContext";
import { useParams } from "react-router-dom";

export default function MenuRouter() {
  const { socket } = useContext(SocketContext);
  const [cardMenu, setCardMenu] = useState(null);
  const [cardShow, setCardShow] = useState(null);
  const [auction, setAuction] = useState(null);

  const userId = window.location.href.toString().split("#")[1];
  let { userId: lobbyId } = useParams();

  const [route, setRoute] = useState("main");

  const [routeComponent, setRouteComponent] = useState(<Menu />);
  const [data, setData] = useState({
    // rollTurn: 3,
  });

  useEffect(() => {
    socket.on("change-index", (res) => {
      console.log(res);
      if (res) {
        setCardMenu(res);
        setRoute("buyCard");
      }
    });
    socket.on("auction-menu", async (data) => {
      const { property, auction, cardId } = data;
      setCardShow({ property, cardId });
      setRoute("auction");
      setAuction(auction);
    });
    socket.emit("get-user-data", JSON.stringify({ userId, lobbyId }), (res) => {
      const { user } = res;
      setData(user);
    });
    return () => {
      socket.off("game-init");
      socket.off("change-index");
      socket.off("auction-menu");
    };
  }, []);
  useEffect(() => {
    const sendData = JSON.stringify({ userId, lobbyId });
    socket.emit("join-lobby", sendData);
    console.log("lobby-join");
    return () => {
      socket.off("join-lobby");
    };
  }, [socket]);
  useEffect(() => {
    if (route === "main") setRouteComponent(<Menu />);
    else if (route === "menu") setRouteComponent(<HamburgerMenu />);
    else if (route === "adminPanel") setRouteComponent(<AdminPanel />);
    else if (route === "buyCard")
      setRouteComponent(<BuyCardMenu data={cardMenu} />);
    else if (route === "colorCard") setRouteComponent(<ColorCardsMenu />);
    else if (route === "auction")
      setRouteComponent(<AuctionMenu cardData={cardShow} auction={auction} />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return (
    <GameRouterContext.Provider
      value={{
        setRoute,
        route,
        data,
        setCardMenu,
        user: data,
        cardShow,
        setCardShow,
      }}
    >
      {socket && routeComponent}
    </GameRouterContext.Provider>
  );
}
