module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");

  //create a new note
  app.post("/notes", notes.create);

  app.get("/notes", notes.findAll);

  //retrive a single  note with id
  app.get("/notes/:noteId", notes.findOne);
  app.put("/notes/:noteId", notes.update);
  app.delete("/notes/:noteId", notes.delete);
};
