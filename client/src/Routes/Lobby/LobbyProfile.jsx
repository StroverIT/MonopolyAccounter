import React, { useContext, useState } from "react";

// Components
import Input from "../../Components/Input";

// Icons
import { GrReturn } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import Button from "../../Components/Button";

// Context
import { SocketContext } from "../socketContext";
// Navigatin
import { useNavigate } from "react-router-dom";

export default function CreateLobby() {
  const { lobbyId } = useParams();
  let navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [inputsForm, setInputsForm] = useState({
    fullName: "",
    icon: "",
  });
  const inputHandler = (e) => {
    setInputsForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    socket.emit(
      "create-user",
      JSON.stringify({
        fullName: inputsForm.fullName,
        icon: inputsForm.icon,
        lobbyId,
        socketId: socket.id,
      }),
      (response) => {
        navigate(`/lobby/${lobbyId}#${response.user._id}`);
      }
    );
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

          <Button onClick={submitHandler} theme="primary200-white">
            Create profile
          </Button>
        </div>
      </div>
    </div>
  );
}
