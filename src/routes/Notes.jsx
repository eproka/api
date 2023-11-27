import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Notes() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/notes?authorId=${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (typeof data === "object") {
            const notesArray = Object.values(data);
            setNotes(notesArray);
          } else {
            console.error("Invalid notes data. Expected an object.", data);
          }
        } else {
          console.error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleCreateNote = () => {
    navigate("/create-note");
  };

  const handleEditNote = (noteId) => {
    navigate(`/edit-note/${noteId}`);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <nav className="navigation">
        <div className="navigation-left">Hello, {user.email}</div>
        <div className="navigation-right">
          <Link to="/home" className="navigation-link ">
            About
          </Link>
          <Link to="/notes" className="navigation-link notes">
            Notes
          </Link>
          <Link to="/login" className="navigation-link ">
            Logout
          </Link>
        </div>
      </nav>

      <div>
        <h1>Notes</h1>
        <div className="add-note-button">
          <button onClick={handleCreateNote}>Add New Note</button>
        </div>
        <div className="notes-container">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div className="note" key={note.id}>
                <Link
                  to={`/view-note/${note.id}`}
                  className="note-content-link"
                >
                  <div className="note-title-container">
                    <div className="note-title">{note.title}</div>
                    <div className="note-date">
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                </Link>
                <div className="note-actions">
                  <button
                    className="icon-button"
                    onClick={() => handleEditNote(note.id)}
                  >
                    ✍️
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No notes found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
