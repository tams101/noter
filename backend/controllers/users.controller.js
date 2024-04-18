const User = require('../schemas/user.schema')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const registerUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.register(email, password)

    const token = createToken(user._id);

    res.status(201).send({email, token})
  } catch (error) {
    res.status(400).send({error: error.message})
  }

}

const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    const token = createToken(user._id)

    res.status(200).send({email, token})
  } catch (error) {
    res.status(400).send({error: error.message})
  }
}

module.exports = {registerUser, loginUser}

