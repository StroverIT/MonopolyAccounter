import React from "react";

export default function Input({ onChange, name, placeholder, type, value }) {
  return (
    <div className="flex flex-col text-sm">
      <label htmlFor={name} className="pb-1 text-white">
        {placeholder}
      </label>
      <input
        onChange={onChange}
        name={name}
        type="text"
        id={name}
        value={value}
        className="py-2 pl-2"
      />
    </div>
  );
}
