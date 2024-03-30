require('dotenv').config()

const mongoose = require('mongoose')
const Note = require('./schemas/note.schema.js')

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
  }
}

  const seedNotes = [
    {
      title: 'Workout',
      content: '5 x Dumbell presses',
      category: 'Fitness',
      email: 'test@example.com'
    },
    {
      title: 'Books to read',
      content: 'Harry Potter, LOTR',
      category: 'Reading',
      email: 'test@example.com'
    },
    {
      title: 'Shopping List',
      content: 'Milk, Eggs, Butter',
      category: 'Shopping',
      email: 'test@example.com'
    },
    {
      title: 'Shopping List',
      content: 'Milk, Eggs, Butter',
      category: 'Shopping',
      email: 'test2@example.com'
    },
  ]

  const seedDb = async () => {
    console.log('Seeding DB...')
    await Note.deleteMany({})
    await Note.insertMany(seedNotes)
  }
  
  module.exports = {seedDb, connectToDb}