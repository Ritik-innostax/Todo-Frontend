
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <header className="bg-blue-600 p-4 shadow-md">
          <nav>
            <ul className="flex justify-center space-x-6">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/todo" className="text-white hover:text-gray-300">Todo</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-300">About</Link>
              </li>
            </ul>
          </nav>
        </header>
    </div>
  )
}

export default Navbar
