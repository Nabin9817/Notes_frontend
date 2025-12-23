import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/api/categories/');
      const data = res.data.results || res.data || [];
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await api.post('/api/categories/', { name });
      setName('');
      fetchCategories();
    } catch (err) {
      alert("Category already exists or server error.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category? This might affect notes using this tag.")) {
      try {
        await api.delete(`/api/categories/${id}/`);
        fetchCategories();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-8">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Manage Tags</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
            Organize your global category pool
          </p>
        </header>
        
        {/* --- ADD CATEGORY FORM --- */}
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-10 items-end">
          <div className="flex-1 w-full">
            <Input 
              label="New Tag Name"
              placeholder="e.g. Finance, Health, Project X..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4"> {/* Align with Input's bottom margin */}
            <Button type="submit" className="h-[58px] px-10">
              Create Tag
            </Button>
          </div>
        </form>

        {/* --- CATEGORIES LIST --- */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Active Categories ({categories.length})
            </span>
          </div>
          
          <div className="divide-y divide-gray-50">
            {categories.length > 0 ? (
              categories.map(cat => (
                <div key={cat.id} className="flex justify-between p-5 hover:bg-gray-50 transition-colors items-center group">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-500 font-black">#</span>
                    <span className="font-bold text-gray-700">{cat.name}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-400 border-none hover:text-red-600 hover:bg-red-50 py-1.5 px-4 text-xs opacity-0 group-hover:opacity-100 transition-all"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-300 font-bold italic">
                No categories found. Create your first one above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}