import React from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-secondary">
      <h1 className="mb-5 text-3xl text-primary">Monopoly Accounter</h1>
      <Link to="/lobby">
        <Button theme="gray-white">Start game</Button>
      </Link>
    </div>
  );
}
