import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu, GiHouseKeys } from "react-icons/gi";
import Button from "../../Components/Button";
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
              <div className="bg-gray-100 " key={card._id}>
                <div
                  className={`w-full ${card.colorToDisplay} flex items-center justify-between  py-4 text-xl font-bold px-2`}
                >
                  <div className="">
                    <div>{card?.name}</div>
                    <div className="text-sm text-center text-primary">
                      {card.housesBought}
                    </div>
                  </div>
                  {!card?.isOnMortgage && isBuildings <= 0 && (
                    <div className="relative text-[0.9rem] text-xs ">
                      <button
                        className="py-1 bg-gray text-white
                       rounded-full px-4 font-thin"
                        onClick={() => mortgageHandler(card._id, "mortgage")}
                      >
                        Ипотекирай
                      </button>
                      <div className="text-center text-green mt-1">
                        +{format(card.mortgagePrice)}
                      </div>
                    </div>
                  )}
                  {card.isOnMortgage && isBuildings <= 0 && (
                    <div className="relative text-[0.9rem] text-xs ">
                      <button
                        className="py-1 bg-gray text-white
                       rounded-full px-4 font-thin"
                        onClick={() =>
                          mortgageHandler(card._id, "returnMortgage")
                        }
                      >
                        Върни имота
                      </button>
                      <div className="text-center text-red mt-1">
                        -{format(card.mortgagePrice * 1.1)}
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="my-2 text-center">
                  Наем <span className="pl-1">{format(card.price)}</span>
                </h3>
                <div className="px-4 pb-5">
                  <div className="flex justify-between">
                    <h3>С 1 къща</h3>
                    <div className="font-semibold">{format(card.oneHouse)}</div>
                  </div>
                  <div className="flex justify-between">
                    <h3>С 2 къщи</h3>
                    <div className="font-semibold">
                      {format(card.twoHouses)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h3>С 3 къщи</h3>
                    <div className="font-semibold">
                      {format(card.threeHouses)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h3>С 4 къщи</h3>
                    <div className="font-semibold">
                      {format(card.fourHouses)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h3>С ХОТЕЛ</h3>
                    <div className="font-semibold">{format(card.hotel)}</div>
                  </div>
                  <h3 className="mt-2 mb-2 font-semibold text-center">
                    Ипотечна стойност {format(card.mortgagePrice)}
                  </h3>
                  <h3 className="mb-1 text-xs text-center">
                    Къщите струват по {format(card.housePrice)} всяка.
                  </h3>
                  <h3 className="text-xs text-center">
                    Хотелите струват по {format(card.housePrice)}, всеки плюс 4
                    къщи
                  </h3>
                  {calcTotal === "All" && !isColorOnMortgage && (
                    <div className="flex text-center justify-between mt-10 flex-col  text-xs space-y-5">
                      {isBuildings < cardShow?.total * 5 &&
                        card.housesBought < highestNumHouse && (
                          <div>
                            <Button
                              theme="primary200-white"
                              onClick={() =>
                                upgradeHouse(card._id, card.housesBought)
                              }
                            >
                              Upgrade
                            </Button>
                            <div className="text-red">
                              -{format(cardShow?.upgrade)}
                            </div>
                          </div>
                        )}
                      {card.housesBought > 0 && (
                        <div>
                          <Button
                            theme="primary200-white"
                            onClick={() => downgradeHouse(card._id)}
                          >
                            Downgrade
                          </Button>
                          <div className="text-green">
                            +{format(cardShow?.downgrade)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
