import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white px-6 py-3 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold cursor-pointer">iTask</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="hover:text-yellow-400 transition-all duration-300"
            >
              Your Tasks
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 bg-[#1e3a8a]/90 p-4 mt-2 rounded-xl backdrop-blur-md shadow-md">
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition-all duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-400 transition-all duration-200"
            >
              Your Tasks
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;



