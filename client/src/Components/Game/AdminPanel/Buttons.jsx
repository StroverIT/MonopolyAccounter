import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../../Routes/socketContext";
import InputCustomMoney from "../InputCustomMoney";

export default function Buttons({ userMenu }) {
  const { socket, setCardMenu } = useContext(SocketContext);
  let { userId: lobbyId } = useParams();

  const [typePriceAdd, setTypePriceAdd] = useState("k");
  const [typePriceRemove, setTypePriceRemove] = useState("k");

  const [moneyAdd, setMoneyAdd] = useState("");
  const [moneyRemove, setMoneyRemove] = useState("");

  const [index, setIndex] = useState("");

  const moneySentHandler = (type) => {
    const data = { userId: userMenu._id, lobbyId, typeAction: type };
    if (type === "add") {
      data.money = moneyAdd;
      data.moneyType = typePriceAdd;
    } else if (type === "remove") {
      data.money = moneyRemove;
      data.moneyType = typePriceRemove;
    }
    socket.emit("money-handler", JSON.stringify(data));
  };

  return (
    <div className="flex flex-col space-y-4 mt-5 text-xs">
      <div className="flex items-center justify-between flex-col">
        <InputCustomMoney
          typePrice={typePriceAdd}
          setTypePrice={setTypePriceAdd}
          setPrice={setMoneyAdd}
          price={moneyAdd}
        />
        <div className="w-full px-5">
          <button
            className="w-full  py-2 rounded-full primary200-white"
            onClick={() => moneySentHandler("add")}
          >
            Добави пари
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between flex-col">
        <InputCustomMoney
          typePrice={typePriceRemove}
          setTypePrice={setTypePriceRemove}
          setPrice={setMoneyRemove}
          price={moneyRemove}
        />
        <div className="w-full px-5">
          <button
            className="w-full  py-2 rounded-full primary200-white"
            onClick={() => moneySentHandler("remove")}
          >
            Вземи пари
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between flex-col">
        <div>
          <input
            type="text"
            className="w-22 py-2 text-center"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            name="index"
          />
        </div>
        <div className="w-full px-5">
          <button className="w-full  py-2 rounded-full primary200-white">
            Сложи на индекс
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full px-5">
          <button className="w-full  py-2 rounded-full primary200-white">
            Банкрутирай
          </button>
        </div>
      </div>
    </div>
  );
}
