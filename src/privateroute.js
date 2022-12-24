import React from "react";
import { Navigate } from "react-router-dom";

function Privateroute({ component }) {
  const token = localStorage.getItem("token");

  return <div>{token ? component : <Navigate to={`/`} />}</div>;
}

export default Privateroute;
