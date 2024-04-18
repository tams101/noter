import { useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { register } from "../../utils/api"

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {dispatch} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const res = await register(email, password)
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.data))
      setIsLoading(false)

      dispatch({type: 'LOGIN', payload: res.data})
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setError(error.response.data.error)
    }

  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <label htmlFor="email">Email:</label>
      <input 
        type="email" 
        onChange={(e) => {setEmail(e.target.value)}} 
        value={email} 
      />

    <label htmlFor="password">Password:</label>
      <input 
        type="password" 
        onChange={(e) => {setPassword(e.target.value)}} 
        value={password} 
      />

      <button>Create Account</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Register