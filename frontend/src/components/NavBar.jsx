import {Link} from 'react-router-dom'
import useLogout from "../../hooks/useLogout"
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

function NavBar() {
  const {logout} = useLogout()
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }
  return (
    <nav>
      <div className='nav-container'>
        <Link to="/">
          <h1>Noter</h1>
        </Link>

        <div className='nav-items'>
          {user && (<div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          )}

          {!user && (<div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>)}
        </div>
      </div>
    </nav>
  )
}

export default NavBar