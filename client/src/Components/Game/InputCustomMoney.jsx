import React, { useEffect } from "react";
import usePrevious from "../../utils/usePrevious";

export default function InputCustomMoney({
  typePrice,
  setTypePrice,
  price,
  setPrice,
}) {
  const prevTypePrice = usePrevious(typePrice);

  const inputHandler = (e) => {
    e.preventDefault();
    let val = e.target.value;

    if (val >= 1000000 && typePrice !== "m") {
      val = val / 1000000;
      setTypePrice("m");
    }

    setPrice(val);
  };
  useEffect(() => {
    if (prevTypePrice === "m") {
      setPrice(price * 1000000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typePrice]);

  return (
    <div className="flex w-full items-center justify-center">
      <input
        type="number"
        name="price"
        value={price}
        onChange={inputHandler}
        className="text-white text-center bg-primary-200 w-full py-2 "
      />
      <div className="">
        <select
          value={typePrice}
          onChange={(e) => setTypePrice(e.target.value)}
          className="bg-primary-100 py-[0.65rem] text-white px-2 text-xs"
        >
          <option value="k">K</option>
          <option value="m">M</option>
        </select>
      </div>
    </div>
  );
}
