import { addNote , deleteNote,editNote, getNotes } from "../controllers/notes.controller";
import   {authenticateMiddleware, authenticateMiddlewareM}  from "../middleweartester"
  const express = require("express")
  
  const router = express.Router()



  router.post("/add-note",authenticateMiddlewareM, addNote)
  router.delete("/delete-note",authenticateMiddlewareM, deleteNote)
  router.put("/edit-note",authenticateMiddlewareM, editNote)
  router.post("/",authenticateMiddlewareM, getNotes)



  module.exports = router
  