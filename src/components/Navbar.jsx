import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearch, onCreateClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-2xl font-black text-blue-600">NOTELY</Link>
        
        {/* Search Bar Input */}
        <input 
          type="text" 
          placeholder="Search titles or content..." 
          onChange={(e) => onSearch(e.target.value)}
          className="hidden md:block bg-gray-100 border-none rounded-full px-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onCreateClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition"
        >
          + Create Note
        </button>
        <Link to="/categories" className="text-gray-600 font-medium hover:text-blue-600 text-sm">Categories</Link>
        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="text-gray-400 hover:text-red-500 font-medium text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}