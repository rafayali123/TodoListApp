// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className='flex justify-around bg-indigo-900 text-white py-2'>
//         <div className="logo">
//             <span className='font-bold text-xl mx-8'>iTask</span>
//         </div>
//       <ul className="flex gap-8 mx-9">
//         <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
//         <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
//       </ul>
//     </nav>
//   )
// }

// export default Navbar












// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-indigo-900 text-white px-6 py-3 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-bold cursor-pointer">
//           iTask
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8">
//           <li>
//             <Link
//               to="/"
//               className="hover:font-bold transition-all duration-200"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               className="hover:font-bold transition-all duration-200"
//             >
//               Your Tasks
//             </Link>
//           </li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <ul className="md:hidden flex flex-col gap-4 bg-indigo-800 p-4 mt-2 rounded-lg">
//           <li>
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="hover:font-bold transition-all duration-200"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               onClick={() => setIsOpen(false)}
//               className="hover:font-bold transition-all duration-200"
//             >
//               Your Tasks
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;













// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Animation variants for mobile menu
//   const menuVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
//   };

//   return (
//     <nav className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 py-3">
//         {/* Logo with animation */}
//         <motion.div
//           className="text-2xl font-bold cursor-pointer select-none"
//           whileHover={{ scale: 1.1, rotate: 5 }}
//           whileTap={{ scale: 0.95, rotate: 0 }}
//         >
//           iTask
//         </motion.div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-10 font-medium text-lg">
//           {["Home", "Your Tasks"].map((item) => (
//             <motion.li
//               key={item}
//               whileHover={{ scale: 1.2, color: "#f0abfc" }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Link to={item === "Home" ? "/" : "/tasks"}>{item}</Link>
//             </motion.li>
//           ))}
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl p-2 hover:bg-indigo-700 rounded-lg transition-all"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <motion.div
//             animate={{ rotate: isOpen ? 90 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {isOpen ? <FaTimes /> : <FaBars />}
//           </motion.div>
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.ul
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={menuVariants}
//             className="md:hidden flex flex-col gap-4 bg-indigo-800 p-5 mt-2 rounded-lg shadow-lg mx-6 mb-3"
//           >
//             {["Home", "Your Tasks"].map((item) => (
//               <motion.li
//                 key={item}
//                 whileHover={{ scale: 1.05, color: "#f0abfc" }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Link
//                   to={item === "Home" ? "/" : "/tasks"}
//                   onClick={() => setIsOpen(false)}
//                   className="block py-2 px-4 rounded-md hover:bg-indigo-700 transition"
//                 >
//                   {item}
//                 </Link>
//               </motion.li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;




































// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white px-6 py-3 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-extrabold tracking-wide cursor-pointer">
//           iTask
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-8">
//           <li>
//             <Link
//               to="/"
//               className="hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               className="hover:text-yellow-400 hover:scale-105 transform transition-all duration-300"
//             >
//               Your Tasks
//             </Link>
//           </li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <ul className="md:hidden flex flex-col gap-4 bg-[#1e3a8a]/90 p-4 mt-2 rounded-xl backdrop-blur-md shadow-md">
//           <li>
//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-yellow-400 transition-all duration-200"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tasks"
//               onClick={() => setIsOpen(false)}
//               className="hover:text-yellow-400 transition-all duration-200"
//             >
//               Your Tasks
//             </Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;














// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.nav
//       initial={{ y: -80, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#0f172a]/80 via-[#1e3a8a]/80 to-[#3b82f6]/80 
//                  backdrop-blur-lg text-white shadow-xl"
//     >
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
//         {/* Logo */}
//         <motion.div
//           whileHover={{ scale: 1.1 }}
//           className="text-3xl font-extrabold tracking-wider cursor-pointer text-yellow-400"
//         >
//           iTask
//         </motion.div>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-10 font-medium">
//           <motion.li whileHover={{ scale: 1.1 }}>
//             <Link
//               to="/"
//               className="hover:text-yellow-400 transition duration-300"
//             >
//               Home
//             </Link>
//           </motion.li>
//           <motion.li whileHover={{ scale: 1.1 }}>
//             <Link
//               to="/tasks"
//               className="hover:text-yellow-400 transition duration-300"
//             >
//               Your Tasks
//             </Link>
//           </motion.li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-2xl focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//       <motion.ul
//         initial={{ opacity: 0, y: -20 }}
//         animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
//         transition={{ duration: 0.4 }}
//         className={`${
//           isOpen ? "flex" : "hidden"
//         } md:hidden flex-col gap-4 bg-[#1e3a8a]/90 p-5 mt-2 rounded-xl backdrop-blur-md shadow-lg`}
//       >
//         <li>
//           <Link
//             to="/"
//             onClick={() => setIsOpen(false)}
//             className="hover:text-yellow-400 transition"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/tasks"
//             onClick={() => setIsOpen(false)}
//             className="hover:text-yellow-400 transition"
//           >
//             Your Tasks
//           </Link>
//         </li>
//       </motion.ul>
//     </motion.nav>
//   );
// };

// export default Navbar;

























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



