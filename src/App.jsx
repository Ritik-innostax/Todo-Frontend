
import { BrowserRouter , Route,  Routes } from 'react-router-dom';
import TodoPage from './component/TodoPage';
import HomePage from './component/HomePage';
import AboutPage from './component/AboutPage';
import Navbar from './component/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">

       <Navbar/>

        
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
