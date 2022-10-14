import React, { useContext, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Button from "../../Components/Button";

// Context
import { SocketContext } from "../socketContext";

export default function LobbyList() {
  const { socket } = useContext(SocketContext);
  const [lobbies, setLobbies] = useState([]);
  useEffect(() => {
    socket.emit("get-lobbies", (response) => {
      const formatted = [];
      response.lobbies.forEach((lobby) => {
        if (lobby.isGameStarted) return;
        formatted.push({
          ...lobby,
          joined: lobby.joinedPlayers.length,
        });
      });
      setLobbies(formatted);
    });
    socket.on("refresh-lobbies", (data) => {
      setLobbies(data);
    });
    return () => {
      socket.off("refresh-lobbies");
    };
  }, [lobbies]);
  return (
    <div className="container text-gray">
      <Link to="/createLobby" className="flex items-end justify-end mt-6 mb-10">
        <Button theme="gray-primary">Create lobby</Button>
      </Link>
      <div className="px-2">
        {lobbies.map((lobby, index) => {
          return (
            <Link
              to={`/lobby-join/${lobby._id}`}
              key={lobby.lobbyName + index}
              className="flex justify-between px-3 py-4 mb-2 bg-gray"
            >
              <div className="">
                <span className="text-primary-100">Lobby name:</span>
                <span className="pl-1 text-white">{lobby.lobbyName}</span>
              </div>
              <div className="text-gray-100">{lobby.joined}/6</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
