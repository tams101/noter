const retrieveNotesByEmail = require("../models/notes.model")


const getNotesByEmail = async (req, res, next) => {
  try {
    const data = await retrieveNotesByEmail('test@example.com')
    res.status(200).send({notes: data})
  } catch (error) {
    console.log(error)
  }
  
  
}

module.exports = getNotesByEmail