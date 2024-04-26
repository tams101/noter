import {Link} from 'react-router-dom'
import useLogout from "../../hooks/useLogout"

function NavBar() {
  const {logout} = useLogout()

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
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar