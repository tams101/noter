require('dotenv').config()

const mongoose = require('mongoose')
const Note = require('./schemas/note.schema.js')
const User = require('./schemas/user.schema.js')


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
      email: 'testing@example.com'
    },
    {
      title: 'Books to read',
      content: 'Harry Potter, LOTR',
      category: 'Reading',
      email: 'testing@example.com'
    },
    {
      title: 'Shopping List',
      content: 'Milk, Eggs, Butter',
      category: 'Shopping',
      email: 'testing@example.com'
    },
    {
      title: 'Shopping List',
      content: 'Milk, Eggs, Butter',
      category: 'Shopping',
      email: 'testing2@example.com'
    },
  ]

  const seedUsers = [
    {
      email: 'testing@example.com',
      password: 'password'
    },
    {
      email: 'testing2@example.com',
      password: 'passworD'
    }
  ]

  const seedDb = async () => {
    console.log('Seeding DB...')

    await User.deleteMany({})
    await User.register('testing@example.com', 'password')
    await User.register('testing2@example.com', 'passworD')
    await Note.deleteMany({})
    await Note.insertMany(seedNotes)
    console.log('Finished seeding DB')
  }
  
  module.exports = {seedDb, connectToDb}