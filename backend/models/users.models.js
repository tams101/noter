const User = require('../schemas/user.schema')

const addUser = async (email, password) => {
  try {
    const checkUserExists = await User.findOne({email})

    if(checkUserExists) {
      return res.status(400).json({msg: 'A user has already registered with this email'})
    } else {
      
    }
  } catch (error) {
    return error
  }
}

module.exports = addUser