import React, { useContext, useEffect, useState } from "react";

// Icons
import Main from "../../Components/Game/AdminPanel/Main";
import UserMenu from "../../Components/Game/AdminPanel/UserMenu";

export default function AdminPanel() {
  const [userMenu, setUserMenu] = useState(null);

  const [route, setRoute] = useState("main");
  const [routeComp, setRouteComp] = useState(<Main />);

  useEffect(() => {
    if (route === "main")
      setRouteComp(<Main setUserMenu={setUserMenu} setRoute={setRoute} />);
    else if (route === "user")
      setRouteComp(<UserMenu userMenu={userMenu} setRoute={setRoute} />);
  }, [route]);
  return routeComp;
}
