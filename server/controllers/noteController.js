const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

// Controller for getting notes of a particular user
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

// Controller for creating a new note
const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("All fields are required");
    } else {
        const note = new Note({
            user: req.user._id, // Assuming req.user is set by an authentication middleware
            title,
            content,
            category,
        });

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
});

// Controller for getting a note by its ID
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
});

// Controller for deleting a note
const deleteNote = asyncHandler(async (req, res) => {
    // Find and delete the note by its ID
    const note = await Note.findByIdAndDelete(req.params.id);
  
    // Check if the note exists
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }
  
    // Check if the authenticated user is the owner of the note
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    // Send a response confirming the note was removed
    res.json({ message: "Note removed" });
  });
  

// Controller for updating a note
const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
  
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  });

module.exports = { getNotes, createNote, getNoteById, deleteNote, updateNote };
