import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const logs = [
  {
    user: { fullName: "Emil Z.", icon: "Шапка" },
    action: "Купи Гдиня",
    _id: "ivan1",
  },
];
export default function LogsMenu() {
  return (
    <section className="h-screen flex justify-center items-center">
      <section className="w-10/12 h-5/6 bg-gray">
        <div className="flex justify-between">
          <div>
            <GiHamburgerMenu />
          </div>
          <div className="text-xl text-primary-100">History of actions</div>
          <div className="invisible"></div>
        </div>
        <section className="mt-10">
          {logs.map((log) => {
            return (
              <div
                key={log._id}
                className="text-bg-color flex bg-gray-100 w-full px-2 py-2"
              >
                <div className="text-center">
                  <h2>{log.user.fullName}</h2>
                  <h4 className="text-xs text-primary-100">{log.user.icon}</h4>
                </div>
                <div className="w-4 h-1 bg-bg-color my-auto mx-3"></div>
                <div className="flex flex-wrap items-center ">{log.action}</div>
              </div>
            );
          })}
        </section>
      </section>
    </section>
  );
}
