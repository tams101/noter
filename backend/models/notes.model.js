const Note = require("../schemas/note.schema")

const retrieveNotesByEmail = async (email) => {
  try {
    const notes = await Note.find({email})
    return notes
  } catch (error) {
    console.log(error)
  }
  
} 

module.exports = retrieveNotesByEmail