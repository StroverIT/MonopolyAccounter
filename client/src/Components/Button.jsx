import React from "react";

export default function Button({ onClick, children, theme }) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-2  rounded-full ${theme}`}
      type="button"
    >
      {children}
    </button>
  );
}
