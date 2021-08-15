const Note = require("../models/note.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  console.log("req:", req.body);
  // res.json(req.body);
  // return;
  const { title, content } = req.body;

  Note.create({ title, content }, (err, note) => {
    if (err) {
      res.status(500).json({
        message:
          "Oops something went wrong.Couldnot create note." + err.message,
      });
    }
    res.status(201).json({ message: "Created Successfully", data: note });
  });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error  occurred while retrieving notes",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  const id = req.params.noteId;
  Note.findById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).send({ message: "Note not found id" + id });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind == "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id" + id,
        });
      }
      return res
        .status(404)
        .send({ message: "Error retrieving note with id " + id });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  const id = req.params.noteId;
  const { title, content } = res.body;
  Note.findOneAndUpdate({ _id: id }, { title, content })
    .then((note) => {
      if (!note) {
        return res.send(404).send({
          message: "Note not found with id" + id,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      res.status(404).send({
        message: "Error update note wit id " + id,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
