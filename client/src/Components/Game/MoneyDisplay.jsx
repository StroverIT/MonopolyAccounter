import React from "react";
import { format } from "../../utils/formatter";

export default function MoneyDisplay({ money, networth }) {
  return (
    <div className="my-5  text-gray-100">
      <div>
        Money: <span className="pl-1 text-white">{format(money)}</span>
      </div>
      <div>
        Networth: <span className="pl-1 text-white">{format(networth)}</span>
      </div>
    </div>
  );
}
