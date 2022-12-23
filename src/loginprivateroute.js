import React from "react";
import { Navigate } from "react-router-dom";

function LoginPrivateroute({ children }) {
  const token = localStorage.getItem("token")
  const manager = localStorage.getItem("manager")

  return (
    <div>
      {manager === 'false' && token === null ? children : <Navigate to={`/restaurants`}></Navigate>}
    </div>
  )
}

export default LoginPrivateroute;