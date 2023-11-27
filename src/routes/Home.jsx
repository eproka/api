import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  const registrationDate = new Date(user.date);

  const formattedDate = registrationDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleGoToNotes = () => {
    navigate("/notes");
  };

  return (
    <div>
      <nav className="navigation">
        <div className="navigation-left">Hello, {user.email}</div>
        <div className="navigation-right">
          <Link to="/home" className="navigation-link about">
            About
          </Link>
          <Link to="/notes" className="navigation-link">
            Notes
          </Link>
          <Link to="/login" className="navigation-link">
            Logout
          </Link>
        </div>
      </nav>
      <div className="content">
        <h1>About Me</h1>
        <p>
          <strong>Email:</strong>{" "}
          <span style={{ color: "gray" }}>{user.email}</span>
        </p>
        <p>
          <strong>Date sign up:</strong>{" "}
          <span style={{ color: "gray" }}>{formattedDate}</span>
        </p>
        <button onClick={handleGoToNotes}>Go to Notes</button>
      </div>
    </div>
  );
}
