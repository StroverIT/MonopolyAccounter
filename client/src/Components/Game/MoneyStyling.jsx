import React from "react";

export default function MoneyStyling({ m, k, negative }) {
  return (
    <div className={`text-center ${negative ? "text-red" : "text-green"}`}>
      <span>{negative ? "-" : "+"}</span>
      <span className="pl-1">{m}M</span>
      <span className="pl-1">{k}k</span>
    </div>
  );
}
