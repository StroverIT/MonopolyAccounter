import React, { useContext, useEffect, useState } from "react";
import { GrReturn } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
// Components
import Button from "../../Components/Button";
// Context
import { SocketContext } from "../socketContext";

export default function WaitingUser() {
  let { id } = useParams();
  let navigate = useNavigate();

  const { socket, lobbies, setLobbies } = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  const [currUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const userId = window.location.href.toString().split("#")[1];

    socket.emit(
      "get-lobby-users",
      JSON.stringify({ lobbyId: id }),
      (response) => {
        const joined = response.lobby.joinedPlayers;
        setUsers(joined);
        const foundCreator = joined.find((user) => user._id == userId);
        setCurrentUser(foundCreator);
      }
    );
    socket.on("receive-user", (data) => {
      console.log("data", data);
      setUsers((prevState) => [...prevState, data.user]);
    });
    socket.on("change-to-menu", (response) => {
      const pageRed = `/game/${id}#${userId}`;

      navigate(pageRed);
    });
    return () => {
      socket.off("receive-user");
      socket.off("change-to-menu");
    };
  }, []);

  const startGameHandler = () => {
    const data = JSON.stringify({ lobby: id });
    socket.emit("start-game", data, (response) => {
      const pageRed = `${response.page}#${currUser._id}`;
      console.log(pageRed);
      navigate(pageRed);
    });
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-10/12 bg-gray h-5/6 ">
        <div className="h-full">
          <div className="flex items-center justify-center px-4 pt-5 pb-2">
            <Link to="/lobby" className="mr-auto text-primary-100">
              <GrReturn />
            </Link>
            <h1 className="mr-auto text-xl text-center text-primary-100">
              Waiting for players...
            </h1>
          </div>
          <div className="text-xl text-center text-gray-100 ">
            {users.length}/6
          </div>
          <div className=" mt-28">
            <div className="grid grid-cols-2 px-2 mt-5 gap-y-4 ">
              {users.map((user) => {
                return (
                  <div className="text-center" key={user._id}>
                    <div
                      className={`text-lg ${
                        user.role === "player"
                          ? "text-gray-100"
                          : "text-primary"
                      }`}
                    >
                      {user.fullName}
                    </div>
                    <div className="text-xs text-center text-primary-200">
                      {user.icon}
                    </div>
                  </div>
                );
              })}
            </div>
            {currUser?.role == "lobbyCreator" && (
              <div className="flex items-center justify-center mt-56 ">
                <Button theme="primary200-white" onClick={startGameHandler}>
                  Start game
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
