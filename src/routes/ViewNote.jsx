import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

export default function ViewNote() {
  const { user } = useContext(AuthContext);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5001/notes/${noteId}`);
        if (response.ok) {
          const noteData = await response.json();
          setNote(noteData);
        } else {
          console.error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleEditNote = () => {
    navigate(`/edit-note/${noteId}`);
  };

  const handleDeleteNote = () => {
    fetch(`http://localhost:5001/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate("/notes");
        } else {
          console.error("Failed to delete note");
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  const handleGoBack = () => {
    navigate("/notes");
  };

  if (!note) {
    return <div>Loading...</div>;
  }

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
      <div className="centered-container">
        <div className="viewNote-container">
          <div className="button-back-container">
            <button className="button-back" onClick={handleGoBack}>
              Back
            </button>
          </div>
          <div className="viewNote-title-container">
            <h2 className="viewNote-title">{note.title}</h2>
          </div>
          <div className="icon-container">
            <button
              className="icon-button"
              onClick={handleEditNote}
              title="Редактировать"
            >
              ✍️
            </button>
            <button
              className="icon-button"
              onClick={handleDeleteNote}
              title="Удалить"
            >
              🗑️
            </button>
          </div>
        </div>
        <div className="note-text-container">{note.text}</div>
      </div>
    </div>
  );
}
