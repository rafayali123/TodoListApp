"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBars, FaTimes, FaHome, FaSignOutAlt, FaTasks } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 text-white px-6 py-4 shadow-2xl"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-slate-900">✓</span>
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            iTask
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 items-center">
          <li>
            <Link
              to="/home"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <FaHome className="group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-amber-400 transition-colors">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <FaTasks className="group-hover:text-amber-400 transition-colors" />
              <span className="group-hover:text-amber-400 transition-colors">Your Tasks</span>
            </Link>
          </li>
          <li>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-300"
            >
              <FaSignOutAlt />
              Logout
            </motion.button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-2xl p-2 rounded-xl hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-2 bg-slate-900/90 backdrop-blur-xl p-4 mt-4 rounded-2xl border border-white/10 shadow-2xl">
              <li>
                <Link
                  to="/home"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <FaHome className="text-amber-400" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <FaTasks className="text-amber-400" />
                  Your Tasks
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  className="flex items-center gap-3 w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar


