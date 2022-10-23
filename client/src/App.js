// import logo from './logo.svg';
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";

// Lobby
import CreateLobby from "./Routes/Lobby/CreateLobby";
import LobbyList from "./Routes/Lobby/LobbyList";
import LobbyProfile from "./Routes/Lobby/LobbyProfile";

import WaitingUser from "./Routes/Lobby/WaitingUser";

// GameMenu
import MenuRouter from "./Routes/Game/MenuRouter";
import BuyCardMenu from "./Routes/Game/BuyCardMenu";

import { io } from "socket.io-client";

import { SocketContext } from "./Routes/socketContext";

function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io("http://localhost:5000");

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="">
      {socket && (
        <SocketContext.Provider value={{ socket }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby">
              <Route index element={<LobbyList />} />
              <Route path=":id" element={<WaitingUser />} />
            </Route>
            <Route path="/game">
              <Route path=":userId" element={<MenuRouter />} />
            </Route>
            <Route path="/createLobby" element={<CreateLobby />} />
            <Route path="/lobby-join/:lobbyId" element={<LobbyProfile />} />
          </Routes>
        </SocketContext.Provider>
      )}
      {!socket && <div>Loading.... </div>}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
