import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Matches your path: path('api/auth/signup/', SignupAPIView...)
      await api.post("/api/auth/signup/", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try a different username/email.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Username"
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          type="email"
          placeholder="Email Address"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 mb-6 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

<p>
  Already have an account? 
  <Link to="/login" className="text-blue-500 underline"> Login here</Link>
</p>