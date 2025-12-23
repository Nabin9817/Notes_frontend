import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
// Import your custom components
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); 
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-[2rem] w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 tracking-tight">Login</h2>
        
        {/* Using your custom Input component for Email */}
        <Input 
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Using your custom Input component for Password */}
        <Input 
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Using your custom Button component */}
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full"
        >
          Login
        </Button>
        
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}