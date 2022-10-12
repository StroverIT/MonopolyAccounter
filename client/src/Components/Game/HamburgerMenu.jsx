import React from "react";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../Button";

export default function HamburgerMenu() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10/12 bg-gray h-5/6">
        <div className="flex items-center justify-between">
          <div className="">
            <GiHamburgerMenu />
          </div>
          <h3 className="text-lg text-primary-100">Menu</h3>
          <div className="invisible text-lg text-primary-100">m</div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Button>Начало</Button>
          <Button>Trading</Button>
          <Button>История</Button>
          <Button>История</Button>
          <Button>Admin Panel</Button>
          <Button>Откажи се</Button>
        </div>
      </div>
    </div>
  );
}
