const mongoose = require("mongoose")
const {retrieveNotesByEmail, addNewNote, updateNoteById, removeNoteById} = require("../models/notes.model")


const getNotesByEmail = async (req, res, next) => {
  const {email} = req.params
  try {
    const data = await retrieveNotesByEmail(email)
    if(data.length === 0) return res.status(404).send({msg: 'Email doesn\'t exist'})
    res.status(200).send({notes: data})
  } catch (error) {
    res.status(400)
  }
  
}

const postNewNote = async (req, res, next) => {
  const {title, content, category, email} = req.body
  const emptyFields = []

  if(!title) emptyFields.push('title')
  if(!content) emptyFields.push('content')
  if(!category) emptyFields.push('category')

  if(emptyFields.length > 0) return res.status(400).send({msg: 'Please complete all fields'})

  try {
    const note = await addNewNote(title, content, category, email)
    res.status(201).send({note})
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

const patchNoteById = async (req, res, next) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({msg: 'Note doesn\'t exist'})

  const {title, content, category} = req.body

  const propsToUpdate = {}
  if (title) propsToUpdate.title = title
  if (content) propsToUpdate.content = content
  if (category) propsToUpdate.category = category

  try {
    const note = await updateNoteById(id, propsToUpdate)
    if (!note) return res.status(404).send({msg: 'ID does not exist'})
    
    res.status(200).send({note})
  } catch (error) {
    res.status(400).send({msg: error.message})
  }

}

const deleteNoteById = async (req, res, next) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({msg: 'Note doesn\'t exist'})

  try {
    const note = await removeNoteById(id)
    res.status(204).send({msg: 'Note deleted'})
  } catch (error) {
    res.status(400).send({msg: error.message})
  }
}

module.exports = {getNotesByEmail, postNewNote, patchNoteById, deleteNoteById}