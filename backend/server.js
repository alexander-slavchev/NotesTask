const express = require("express");
const cors = require("cors");
const notesController = require("./controllers/notesController");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/notes", notesController.getAllNotes);
app.post("/api/notes", notesController.createNote);
app.delete("/api/notes/:id", notesController.deleteNote);
app.put("/api/notes/:id", notesController.updateNote);

app.listen(5000, () => console.log("🚀 Backend running on port 5000"));
