import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [editNoteText, setEditNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);


  useEffect(() => {
    fetch("http://localhost:5000/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const addNote = () => {
    if (newNoteText.trim() === "") return;
    fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newNoteText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...notes, data]);
        setNewNoteText(""); 
      });
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    }).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
    });
  };

  const editNote = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: editNoteText }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedNotes = notes.map((note) =>
          note.id === id ? data : note
        );
        setNotes(updatedNotes);
        setEditNoteText("");
        setEditingNoteId(null);
      });
  };

  return (
    <div className="App">
      <h1>Записки</h1>

     
      <input
        type="text"
        value={newNoteText}
        onChange={(e) => setNewNoteText(e.target.value)}
        placeholder="Въведете нова бележка"
      />
      <button onClick={addNote}>Добави</button>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {editingNoteId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editNoteText}
                  onChange={(e) => setEditNoteText(e.target.value)}
                />
                <button onClick={() => editNote(note.id)}>Запази</button>
              </div>
            ) : (
              <span>{note.text}</span>
            )}
            <button onClick={() => deleteNote(note.id)}>Изтрий</button>
            <button onClick={() => {
              setEditingNoteId(note.id);
              setEditNoteText(note.text);
            }}>
              Редактирай
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
