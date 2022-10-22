import React from "react";

import { GrReturn } from "react-icons/gr";
import Buttons from "./Buttons";
export default function UserMenu({ userMenu, setRoute }) {
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="h-5/6 w-10/12 bg-gray relative pb-10 pt-5">
        <div className="px-5 flex  items-center">
          <div className="mr-auto " onClick={() => setRoute("main")}>
            <GrReturn />
          </div>
          <h3 className="mr-auto text-primary-100 text-xl">
            {userMenu.fullName} - {userMenu.icon}
          </h3>
        </div>
        <Buttons userMenu={userMenu} />
      </div>
    </div>
  );
}
