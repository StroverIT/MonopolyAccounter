// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";

// Lobby
import CreateLobby from "./Routes/Lobby/CreateLobby";
import LobbyList from "./Routes/Lobby/LobbyList";
import LobbyProfile from "./Routes/Lobby/LobbyProfile";

import WaitingUser from "./Routes/Lobby/WaitingUser";
import WaitingAdmin from "./Routes/Lobby/WaitingAdmin";

// GameMenu
import GameMenu from "./Routes/Game/Menu";
import ColorCardsMenu from "./Routes/Game/ColorCardsMenu";
import AdminPanel from "./Routes/Game/AdminPanel";
import HamburgerMenu from "./Components/Game/HamburgerMenu";
import BuyCardMenu from "./Routes/Game/BuyCardMenu";
import AuctionMenu from "./Routes/Game/AuctionMenu";
import TradeMenu from "./Routes/Game/Trading/TradeMenu";
import TradingWith from "./Routes/Game/Trading/TradingWith";
import TradeCardsMenu from "./Routes/Game/Trading/TradeCardsMenu";
import LogsMenu from "./Routes/Game/LogsMenu";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby">
          <Route index element={<LobbyList />} />
          <Route path=":id" element={<LogsMenu />} />
        </Route>
        <Route path="/createLobby" element={<CreateLobby />} />
        <Route path="/lobby" element={<LobbyProfile />} />
      </Routes>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
