import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import custom components
import Button from '../components/Button';
import Input from '../components/Input';

export default function Navbar({ onSearch, onCreateClick }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="border-b px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="text-2xl font-black text-blue-600 tracking-tighter">
          NOTELY
        </Link>
        
        {/* --- SEARCH AREA --- */}
        <div >
          <Input 
            type="text" 
            placeholder="Search titles or content..." 
            onChange={(e) => onSearch(e.target.value)} 
          /> 
        </div>
      </div>

      <div className="flex items-center gap-3">

        {/* Using custom Button for Create Note */}
        <Button 
          onClick={onCreateClick}
          variant="primary"
          className="text-sm py-2 px-5"
        >
          + Create Note
        </Button>

        {/* Using custom Button for Logout */}
        <Button 
          onClick={() => { logout(); navigate('/'); }}
          variant="outline"
          className="border-none text-gray-400 hover:text-red-500 text-sm px-2"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}