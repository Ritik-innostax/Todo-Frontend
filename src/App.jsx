
import { BrowserRouter , Route, Link, Routes } from 'react-router-dom';
import TodoPage from './component/TodoPage';
import HomePage from './component/HomePage';
import AboutPage from './component/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

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

        
        <main className="py-8 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
