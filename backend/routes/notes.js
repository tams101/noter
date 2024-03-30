const {getNotesByEmail, postNewNote, patchNoteById, deleteNoteById }= require("../controllers/notes.controller")

const express = require('express')
const { removeNoteById } = require("../models/notes.model")

const router = express.Router()

//GET all notes
router.get('/:email', getNotesByEmail)

//POST new note
router.post('/', postNewNote)

//UPDATE existing note
router.patch('/:id', patchNoteById)

// DELETE a note
router.delete('/:id', deleteNoteById)

module.exports = router