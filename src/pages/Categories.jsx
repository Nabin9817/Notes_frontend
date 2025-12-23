import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const res = await api.get('/api/categories/');
    setCategories(res.data.results || res.data || []);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await api.post('/api/categories/', { name });
      setName('');
      fetchCategories();
    } catch (err) { alert("Category already exists or server error."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await api.delete(`/api/categories/${id}/`);
      fetchCategories();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-black mb-6">Manage Categories</h1>
        
        <form onSubmit={handleAdd} className="flex gap-2 mb-8">
          <input 
            className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Work, Personal, Ideas..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 rounded-xl font-bold">Add</button>
        </form>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {categories.map(cat => (
            <div key={cat.id} className="flex justify-between p-4 border-b last:border-0 items-center">
              <span className="font-medium text-gray-700"># {cat.name}</span>
              <button onClick={() => handleDelete(cat.id)} className="text-red-400 text-sm">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}