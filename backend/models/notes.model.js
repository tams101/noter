const Note = require("../schemas/note.schema")

const retrieveNotesByEmail = async (email) => {
  try {
    const notes = await Note.find({email})
    return notes
  } catch (error) {
    return error
  }
  
}

const addNewNote = async (title, content, category, email) => {
  try {
    const note = await Note.create({title, content, category, email})
    return note
  } catch (error) {
    return error
  }
}

const updateNoteById = async (id, updatedProps) => {
  try {
    const note = await Note.findOneAndUpdate({_id: id}, updatedProps, {new: true})
    return note
  } catch (error) {
    return error
  }
}

const removeNoteById = async (id) => {
  try {
    const note = await Note.findOneAndDelete({_id: id})
    return note
  } catch (error) {
    return error
  }
}

module.exports = {retrieveNotesByEmail, addNewNote, updateNoteById, removeNoteById}