import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function NotFound() {
  const { user } = useContext(AuthContext);

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Page not found</p>
      {user ? (
        <Link to="/home">Go Home</Link>
      ) : (
        <Link to="/login">Go to Login</Link>
      )}
    </div>
  );
}
