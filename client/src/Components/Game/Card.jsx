import React, { useContext } from "react";
import { format } from "../../utils/formatter";
import Button from "../Button";

import { GameRouterContext } from "../../Routes/Game/GameRouterContext";

export default function Card({ data }) {
  const { setRoute, setCardShow } = useContext(GameRouterContext);
  const calcTotal =
    data.total === data.totalOwn ? "All" : `${data.totalOwn}/${data.total}`;
  const isBuildings = data.properties.reduce((a, b) => a + b.housesBought, 0);

  const cardRouteHandler = () => {
    setRoute("colorCard");
    setCardShow(data);
  };
  return (
    <div className="even:ml-2" onClick={cardRouteHandler}>
      <div className="flex">
        <div
          className={`w-full text-4xl ${data.colorToDisplay} h-5 text-transparent `}
        ></div>
        <div>{calcTotal}</div>
      </div>
      {data?.properties?.map((property) => {
        return (
          <div key={property._id} className="flex items-center">
            <div className={``}>{property.name}</div>
            {property.housesBought > 0 && property.housesBought < 5 && (
              <div className="text-primary pl-1 text-xs">{property.houses}</div>
            )}
            {property.housesBought === 5 && (
              <span className="text-primary pl-1">*</span>
            )}
          </div>
        );
      })}
      {isBuildings > 0 && (
        <div className="text-center py-4">
          <button className="bg-primary-200 text-white w-full  py-1 rounded-full text-sm">
            Счупи къща
          </button>
          <div className="text-green mt-1 text-sm">
            +{format(data.downgrade)}
          </div>
        </div>
      )}
    </div>
  );
}
