import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:8005/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home"); // Go to home page
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg border border-blue-300/40 
                   p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Logo / Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-center mb-6 text-yellow-300 drop-shadow-lg"
        >
          🔐 Welcome Back
        </motion.h1>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-400 text-center font-semibold">{error}</div>
        )}      

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full p-3 rounded-lg border border-blue-300/50 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full p-3 rounded-lg border border-blue-300/50 
                         bg-white/20 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 
                       text-black font-bold py-3 rounded-lg shadow-md 
                       transition duration-200"
          >
            Login
          </motion.button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 text-center text-gray-300 text-sm">
          <p>
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-yellow-300 hover:underline font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
    