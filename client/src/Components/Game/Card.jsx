import React from "react";
import { format } from "../../utils/formatter";
import Button from "../Button";

export default function Card({
  bgColor,
  total,
  ownTotal,
  properties,
  upgrade,
  downgrade,
}) {
  const calcTotal = total === ownTotal ? "All" : `${ownTotal}/${total}`;
  const isBuildings = properties.reduce((a, b) => a + b.hotel + b.houses, 0);
  return (
    <div className="even:ml-2">
      <div className="flex">
        <div
          className={`w-full text-4xl ${bgColor} h-5 text-transparent `}
        ></div>
        <div>{calcTotal}</div>
      </div>
      {properties.map((property) => {
        return (
          <div key={property._id} className="flex items-center   ">
            <div
              className={`${
                !isBuildings ? "text-white font-semibold" : "text-gray-100"
              }`}
            >
              {property.name}
            </div>
            {property.houses > 0 && (
              <div className="text-primary pl-1 text-xs">{property.houses}</div>
            )}
            {property.hotel > 0 && <span className="text-primary pl-1">*</span>}
          </div>
        );
      })}
      {isBuildings > 0 && (
        <div className="text-center py-4">
          <button className="bg-primary-200 text-white w-full  py-1 rounded-full text-sm">
            Счупи къща
          </button>
          <div className="text-green mt-1 text-sm">+{format(downgrade)}</div>
        </div>
      )}
    </div>
  );
}
