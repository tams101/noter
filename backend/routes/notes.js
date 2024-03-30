const getNotesByEmail = require("../controllers/notes.controller")

const express = require('express')

const router = express.Router()

//GET all notes
router.get('/', getNotesByEmail)

//POST new note
router.post('/', () => {})

//UPDATE existing note
router.patch('/:id', () => {})

// DELETE a note
router.delete('/:id', () => {})

module.exports = router