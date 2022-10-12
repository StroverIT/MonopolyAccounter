import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button";

export default function LobbyProfile() {
  const { id } = useParams();

  // From here use hashesesh to navigate through the game !
  return (
    <div className="container text-gray">
      <div className="px-2 text-white">Main</div>
    </div>
  );
}
