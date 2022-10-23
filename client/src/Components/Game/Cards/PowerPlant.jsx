import React from "react";
import { format } from "../../../utils/formatter";

export default function PowerPlant({ card, boughtData }) {
  return (
    <div className="bg-gray-100 ">
      <div
        className={`w-full ${card.colorToDisplay} text-center py-4 text-xl font-bold`}
      >
        {card.name}
      </div>
      {!card.isOnMortgage && boughtData?.isBought && (
        <div className="relative text-[0.9rem] text-xs flex items-center justify-center flex-col">
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
      {card.isOnMortgage && boughtData?.isBought && (
        <div className="relative text-[0.9rem] text-xs flex items-center justify-center flex-col">
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
      <h3 className="my-2 text-center">
        Ако притежавате една електрическа централа, наемът е резултат на зара,
        умножен по 4*
      </h3>
      <div className="px-4 pb-5">
        <div className="flex justify-between">
          <h3>
            Ако притежавате и двете електрически централи, наемът е резултат на
            зара, умножен по 10*
          </h3>
        </div>

        <h3 className="mt-2 mb-2 font-semibold text-center">
          Ипотечна стойност {format(card.mortgagePrice)}
        </h3>
        <h5 className="text-center">Умножен по 10,000</h5>
      </div>
    </div>
  );
}
