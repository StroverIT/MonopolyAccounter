import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu, GiHouseKeys } from "react-icons/gi";
import Button from "../../Components/Button";
import PowerPlant from "../../Components/Game/Cards/PowerPlant";
import PropertyCard from "../../Components/Game/Cards/Property";
import TransportCard from "../../Components/Game/Cards/Transport";
import MoneyDisplay from "../../Components/Game/MoneyDisplay";
import MoneyStyling from "../../Components/Game/MoneyStyling";
import { format } from "../../utils/formatter";
import { SocketContext } from "../socketContext";
import { GameRouterContext } from "./GameRouterContext";

export default function ColorCardsMenu() {
  const { socket } = useContext(SocketContext);

  const { setRoute, setCardShow, cardShow, data } =
    useContext(GameRouterContext);
  const [cards, setCards] = useState(cardShow);

  const [calcTotal, setCalTotal] = useState(null);
  const [isBuildings, setIsBuilding] = useState(null);

  const [highestNumHouse, setHighNumHouse] = useState(null);

  const [isColorOnMortgage, setColorOnMortgage] = useState(null);

  const changeRouteHamdler = () => {
    setCardShow(null);
    setRoute("menu");
  };
  const upgradeHouse = (propertyId, housesBought) => {
    const sendData = {
      userId: data._id,
      propertyId,
      cardId: cards._id,
    };
    socket.emit("upgrade-house", JSON.stringify(sendData), (res) => {
      console.log("upg-house", res);
      const cards = res.data;
      setCards(cards);
    });
  };
  const downgradeHouse = (propertyId) => {
    const sendData = {
      userId: data._id,
      propertyId,
      cardId: cards._id,
    };
    socket.emit("downgrade-house", JSON.stringify(sendData), (res) => {
      console.log("upg-house", res);
      const cards = res.data;
      setCards(cards);
    });
  };
  const mortgageHandler = (propertyId, action) => {
    const sendData = {
      userId: data._id,
      propertyId,
      cardId: cards._id,
      action,
    };
    console.log(data._id);
    socket.emit("mortgage", JSON.stringify(sendData), (res) => {
      console.log(res);
      const cards = res.cards;
      setCards(cards);
    });
  };
  useEffect(() => {
    setCalTotal(
      cards?.total == cards?.totalOwn
        ? "All"
        : `${cards.totalOwn}/${cards.total}`
    );

    setIsBuilding(cards?.properties?.reduce((a, b) => a + b.housesBought, 0));
    // High numb on houses
    let cardsArr = cards.properties.map((prop) => prop.housesBought);

    let highNumLogic = Math.max(...cardsArr);

    const allEqual = (arr) => arr.every((val) => val === arr[0]);
    if (allEqual(cardsArr)) {
      highNumLogic += 1;
    }

    setHighNumHouse(highNumLogic);
    const mortgagesArr = cards.properties.map((card) => card.isOnMortgage);
    console.log(mortgagesArr);
    const isMortgage = mortgagesArr.find((card) => card == true);

    console.log(isMortgage);
    setColorOnMortgage(isMortgage);
  }, [cards]);
  const cardFunctionalities = {
    isBought: true,
    isBuildings: isBuildings,
    mortgageHandler: mortgageHandler,
    calcTotal: calcTotal,
    isColorOnMortgage: isColorOnMortgage,
    cardShow: cardShow,
    highestNumHouse: highestNumHouse,
    upgradeHouse: upgradeHouse,
    downgradeHouse: downgradeHouse,
  };
  return (
    <div className="flex items-center justify-center h-full min-h-screen">
      <div className="relative w-10/12 bg-gray h-5/6 my-10">
        <div>
          <div onClick={changeRouteHamdler}>
            <GiHamburgerMenu />
          </div>
          <h1 className="text-center text-xl text-primary-100">
            {data.fullName}
          </h1>
          <h4 className="text-center text-white text-xs">{data.icon}</h4>
        </div>
        <div className="my-5 text-xs text-gray-100">
          <MoneyDisplay />
        </div>
        <h1 className="text-center text-lg text-primary-100">Card Menu</h1>
        <div className="flex items-center justify-center mt-5 ">
          <div className={`w-6/12 h-6 ${cardShow?.colorToDisplay}`}></div>
          <div className="text-primary ml-2">{calcTotal}</div>
        </div>

        <div className="grid lg:grid-cols-3 lg:space-x-5 space-y-5 px-5 my-10">
          {cards?.properties?.map((card) => {
            return (
              <>
                {card.type === "property" && (
                  <PropertyCard card={card} boughtData={cardFunctionalities} />
                )}
                {card.type === "transport" && (
                  <TransportCard card={card} boughtData={cardFunctionalities} />
                )}
                {card.type === "power_plant" && (
                  <PowerPlant card={card} boughtData={cardFunctionalities} />
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
