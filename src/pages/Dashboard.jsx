import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Dashboard() {
  // --- STATE ---
  const [notes, setNotes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewingNote, setViewingNote] = useState(null); 
  
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-created_at");

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: [] });
  const [newCatName, setNewCatName] = useState('');

  // --- RE-FETCH LOGIC ---
  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [search, sortBy]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/api/notes/?search=${search}&ordering=${sortBy}`);
      const data = res.data.results || res.data || [];
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/api/categories/');
      const data = res.data.results || res.data || [];
      setAllCategories(data);
    } catch (err) { console.error(err); }
  };

  // --- ACTIONS ---
  const handleQuickAddCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await api.post('/api/categories/', { name: newCatName });
      setNewCatName('');
      fetchCategories(); 
    } catch (err) { console.error("Category creation failed"); }
  };

  const handleToggleCategory = (id) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(id) 
        ? prev.category.filter(c => c !== id) 
        : [...prev.category, id]
    }));
  };

  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/api/notes/${editingId}/`, formData);
      } else {
        await api.post('/api/note/', formData);
      }
      resetForm();
      fetchNotes();
    } catch (err) { alert("Error saving note."); }
  };

  const startEdit = (note) => {
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || [] 
    });
    setEditingId(note.id);
    setShowCreateForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', category: [] });
    setEditingId(null);
    setShowCreateForm(false);
  };

  const deleteNote = async (id) => {
    if (window.confirm("Delete this note permanently?")) {
      await api.delete(`/api/notes/${id}/`);
      fetchNotes();
    }
  };

  return (
    <div className="min-h-screen bg-oklch(44.4% 0.011 73.639) pb-20">
      <Navbar 
        onSearch={setSearch} 
        onCreateClick={() => { resetForm(); setShowCreateForm(!showCreateForm); }} 
      />

      <div className="max-w-6xl mx-auto p-6">
        
        {/* --- TOOLBAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Vault</h1>
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <span className="text-[10px] font-black text-gray-400 uppercase ml-2">Sort</span>
            <select 
              className="bg-transparent text-sm font-bold outline-none cursor-pointer text-blue-600 mr-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* --- CREATE / EDIT FORM --- */}
        {showCreateForm && (
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-blue-50 mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-black mb-6 text-gray-800 uppercase tracking-widest">
              {editingId ? '⚡ Edit Note' : '✍️ New Note'}
            </h2>
            <form onSubmit={handleSaveNote}>
              <Input 
                placeholder="Title goes here..."
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />

              <div className="mb-8">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-3 ml-1">Categories</label>
                <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto p-2 bg-gray-50 rounded-2xl">
                  {allCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleToggleCategory(cat.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                        formData.category.includes(cat.id) 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2 max-w-sm">
                  <Input 
                    placeholder="New shared tag..."
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                  />
                  <div className="mb-4"> {/* Wrapper to align with Input's mb-4 */}
                    <Button variant="secondary" onClick={handleQuickAddCategory} className="h-[58px]">
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <textarea 
                className="w-full border-2 border-gray-100 p-4 rounded-2xl outline-none focus:border-blue-500 min-h-[200px] text-lg text-gray-600 placeholder-gray-200 resize-none leading-relaxed transition-all"
                placeholder="Capture your thoughts..."
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                required
              />

              <div className="flex justify-end gap-4 mt-6 border-t pt-6">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">
                  {editingId ? 'Update Note' : 'Save Note'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* --- NOTES GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {note.category_names?.map((name, i) => (
                  <span key={i} className="text-[9px] bg-blue-50 text-blue-500 px-2.5 py-1 rounded-lg font-black uppercase tracking-tighter">
                    {name}
                  </span>
                ))}
              </div>
              
              <div className="cursor-pointer" onClick={() => setViewingNote(note)}>
                <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-blue-600 transition">{note.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-4 leading-relaxed mb-6">{note.content}</p>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                <Button variant="outline" className="text-[10px] py-1.5 px-4 uppercase tracking-widest" onClick={() => setViewingNote(note)}>
                  Details
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-blue-600 border-none px-2" onClick={() => startEdit(note)}>Edit</Button>
                  <Button variant="outline" className="text-red-300 border-none px-2" onClick={() => deleteNote(note.id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DETAIL VIEW MODAL --- */}
      {viewingNote && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-xl flex items-center justify-center z-[200] p-6">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-12">
              <div className="flex justify-between items-start mb-10">
                <h2 className="text-4xl font-black text-gray-900 leading-tight">{viewingNote.title}</h2>
                <button onClick={() => setViewingNote(null)} className="text-gray-200 hover:text-gray-900 text-5xl leading-none">&times;</button>
              </div>
              <div className="text-gray-600 text-xl leading-relaxed mb-12 overflow-y-auto max-h-[45vh] pr-4 custom-scrollbar">
                {viewingNote.content}
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Modified</span>
                  <span className="text-sm font-bold text-gray-400">{new Date(viewingNote.updated_at).toLocaleDateString()}</span>
                </div>
                <Button variant="secondary" className="px-12 py-4" onClick={() => setViewingNote(null)}>
                  Got it
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}