import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function CreateNote() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateNote = () => {
    if (validateInputs()) {
      const newNote = {
        authorId: user.id,
        title,
        text: body,
        createdAt: new Date().toISOString(),
      };

      fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => {
          if (response.ok) {
            navigate("/notes");
          } else {
            console.error("Failed to create note");
          }
        })
        .catch((error) => {
          console.error("Error creating note:", error);
        });
    }
  };

  const handleGoBack = () => {
    navigate("/notes");
  };

  return (
    <div>
      <nav className="navigation">
        <div className="navigation-left">Hello, {user.email}</div>
        <div className="navigation-right">
          <Link to="/home" className="navigation-link">
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
      <div className="createNote-container">
        <h1 style={{ textAlign: "center" }}>Create new note</h1>
        <input
          type="text"
          className="title-input"
          placeholder="Name"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="error">{errors.title && <p>{errors.title}</p>}</div>
        <textarea
          className="note-text"
          placeholder=" Note text..."
          value={body}
          onChange={handleBodyChange}
        />
        <div className="button-container">
          <button className="create-button" onClick={handleCreateNote}>
            Create
          </button>
          <button className="back-button" onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
