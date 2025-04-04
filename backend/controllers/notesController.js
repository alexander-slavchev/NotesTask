const fs = require("fs");
const DB_FILE = "db.json";

const loadNotes = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data).notes;
};

const saveNotes = (notes) => {
  fs.writeFileSync(DB_FILE, JSON.stringify({ notes }, null, 2));
};

const getAllNotes = (req, res) => {
  const notes = loadNotes();
  res.json(notes);
};

const createNote = (req, res) => {
  const notes = loadNotes();
  const newNote = { id: Date.now(), text: req.body.text };
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
};

const deleteNote = (req, res) => {
  let notes = loadNotes();
  notes = notes.filter((note) => note.id != req.params.id);
  saveNotes(notes);
  res.json({ message: "Note deleted" });
};

const updateNote = (req, res) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.id == req.params.id);
  if (note) {
    note.text = req.body.text;
    saveNotes(notes);
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
};
