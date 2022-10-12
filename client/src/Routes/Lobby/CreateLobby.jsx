import React, { useState } from "react";

// Components
import Input from "../../Components/Input";

// Icons
import { GrReturn } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function CreateLobby() {
  const [inputsForm, setInputsForm] = useState({
    nickname: "",
    fullName: "",
    icon: "",
  });
  const inputHandler = (e) => {
    setInputsForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-10/12 bg-gray h-5/6 ">
        <div className="flex items-center justify-center px-4 pt-5 pb-5">
          <Link to="/lobby" className="mr-auto text-primary-100">
            <GrReturn />
          </Link>
          <h1 className="mr-auto text-xl text-center text-primary-100">
            Your profile
          </h1>
        </div>
        <div className="flex flex-col px-4 space-y-5">
          <div className="">
            <Input
              onChange={inputHandler}
              name="fullName"
              placeholder="Full name"
              value={inputsForm.fullName}
            />
          </div>
          <div className="">
            <Input
              onChange={inputHandler}
              name="icon"
              placeholder="Icon / figure"
              value={inputsForm.icon}
            />
          </div>
          <div className="">
            <Input
              onChange={inputHandler}
              name="nickname"
              placeholder="Nickname"
              value={inputsForm.nickname}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
