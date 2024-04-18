const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const validator= require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  }
})

//Static signup method

userSchema.statics.register = async function(email, password) {
  if(!email || !password) {
    throw Error('All fields must be completed')
  }

  if(password.length < 8) {
    throw Error('Password must be at least 8 characters')
  }

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  const exists = await this.findOne({email})

  if(exists) {
    throw Error('Email is already registered')
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({email, password: hash})

  return user
}

//Static login method

userSchema.statics.login = async function(email, password) {
  if(!email || !password) {
    throw Error('All fields must be completed')
  }

  const user = await this.findOne({email})

  if(!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error('Incorrect password')
  }

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User;