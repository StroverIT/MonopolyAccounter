import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Button from "../../Components/Button";

export default function LobbyList() {
  const [lobbies, setLobbies] = useState([{ name: "ivan", joined: "0" }]);

  return (
    <div className="container text-gray">
      <Link to="/createLobby" className="flex items-end justify-end mt-6 mb-10">
        <Button theme="gray-primary">Create lobby</Button>
      </Link>
      <div className="px-2">
        {lobbies.map((lobby, index) => {
          return (
            <Link
              to={`/lobby/123#main`}
              key={lobby.name + index}
              className="flex justify-between px-3 py-4 bg-gray"
            >
              <div>
                <span className="text-primary-100">Lobby name:</span>
                <span className="pl-1 text-white">{lobby.name}</span>
              </div>
              <div className="text-gray-100">{lobby.joined}/6</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
