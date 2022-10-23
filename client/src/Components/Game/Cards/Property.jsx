import React from "react";
import { format } from "../../../utils/formatter";
import Button from "../../Button";

export default function PropertyCard({ card, boughtData }) {
  return (
    <div className="bg-gray-100 ">
      <div
        className={`w-full ${card.colorToDisplay} flex ${
          boughtData?.isBought ? "justify-between" : "justify-center"
        } py-4 text-xl font-bold`}
      >
        <div className="">
          <div>{card.name}</div>
          {boughtData?.isBought && (
            <div className="text-sm text-center text-primary">
              {card.housesBought}
            </div>
          )}
        </div>

        {!card.isOnMortgage &&
          boughtData?.isBuildings <= 0 &&
          boughtData?.isBought && (
            <div className="relative text-[0.9rem] text-xs ">
              <button
                className="py-1 bg-gray text-white
                       rounded-full px-4 font-thin"
                onClick={() => boughtData.mortgageHandler(card._id, "mortgage")}
              >
                Ипотекирай
              </button>
              <div className="text-center text-green mt-1">
                +{format(card.mortgagePrice)}
              </div>
            </div>
          )}
        {card.isOnMortgage &&
          boughtData?.isBuildings <= 0 &&
          boughtData?.isBought && (
            <div className="relative text-[0.9rem] text-xs ">
              <button
                className="py-1 bg-gray text-white
                       rounded-full px-4 font-thin"
                onClick={() =>
                  boughtData.mortgageHandler(card._id, "returnMortgage")
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
          <div className="font-semibold">{format(card.twoHouses)}</div>
        </div>
        <div className="flex justify-between">
          <h3>С 3 къщи</h3>
          <div className="font-semibold">{format(card.threeHouses)}</div>
        </div>
        <div className="flex justify-between">
          <h3>С 4 къщи</h3>
          <div className="font-semibold">{format(card.fourHouses)}</div>
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
          Хотелите струват по {format(card.housePrice)}, всеки плюс 4 къщи
        </h3>
        {boughtData?.calcTotal === "All" &&
          card.type === "property" &&
          !boughtData?.isColorOnMortgage &&
          boughtData?.isBought && (
            <div className="flex text-center justify-between mt-10 flex-col  text-xs space-y-5">
              {boughtData?.isBuildings < boughtData?.cardShow?.total * 5 &&
                card.housesBought < boughtData?.highestNumHouse && (
                  <div>
                    <Button
                      theme="primary200-white"
                      onClick={() =>
                        boughtData?.upgradeHouse(card._id, card.housesBought)
                      }
                    >
                      Upgrade
                    </Button>
                    <div className="text-red">
                      -{format(boughtData?.cardShow?.upgrade)}
                    </div>
                  </div>
                )}
              {card.housesBought > 0 && (
                <div>
                  <Button
                    theme="primary200-white"
                    onClick={() => boughtData?.downgradeHouse(card._id)}
                  >
                    Downgrade
                  </Button>
                  <div className="text-green">
                    +{format(boughtData?.cardShow?.downgrade)}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
