import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
// Import your custom components
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend expects 'username'  depending on  Django setup
      await api.post("/api/register/", {
        username: formData.username, 
        email: formData.email,
        password: formData.password,
        first_name: formData.name
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      alert("Registration failed. Email might already be in use.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="p-8 bg-white shadow-lg rounded-[2rem] w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 tracking-tight">
          Create Account
        </h2>

        {/* Username Input */}
        <Input
          label="Username"
          placeholder="nabinsah123"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required 
        />

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required = "True"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        {/* Custom Button Component */}
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full mt-2"
        >
          Register Now
        </Button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}