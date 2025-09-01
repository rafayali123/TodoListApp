
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";

// type Todo = {
//   _id?: string;
//   task: string;
//   isCompleted: boolean;
//   createdAt: string;
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-[#f0f0f0] text-gray-800 px-6 py-3 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-2xl font-bold tracking-wide cursor-pointer">iTask</div>

//         <ul className="hidden md:flex gap-8">
//           <li>
//             <Link to="/" className="hover:text-green-600 transition-all">Home</Link>
//           </li>
//           <li>
//             <Link to="/tasks" className="hover:text-green-600 transition-all">Your Tasks</Link>
//           </li>
//         </ul>

//         <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {isOpen && (
//         <ul className="md:hidden flex flex-col gap-4 bg-[#ffffffcc] p-4 mt-2 rounded-xl backdrop-blur-md shadow-md">
//           <li>
//             <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-green-600 transition-all">Home</Link>
//           </li>
//           <li>
//             <Link to="/tasks" onClick={() => setIsOpen(false)} className="hover:text-green-600 transition-all">Your Tasks</Link>
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// function TodoApp() {
//   const [task, setTask] = useState<string>("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState<boolean>(true);
//   const [filter, setFilter] = useState<"today" | "pending" | "overdue">("today");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     fetch("http://localhost:8005/api/todos", {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((res) => res.json())
//       .then((data) => setTodos(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAdd = async () => {
//     const token = localStorage.getItem("token");
//     const trimmed = task.trim();
//     if (trimmed.length <= 0) return;

//     if (editId) {
//       await fetch(`http://localhost:8005/api/todos/${editId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ task: trimmed }),
//       });
//       setTodos(todos.map((item) => (item._id === editId ? { ...item, task: trimmed } : item)));
//       setEditId(null);
//       setTask("");
//     } else {
//       const newTodo = {
//         task: trimmed,
//         isCompleted: false,
//         createdAt: new Date().toISOString(),
//       };
//       const res = await fetch("http://localhost:8005/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(newTodo),
//       });
//       if (res.ok) {
//         const saved = await res.json();
//         setTodos([...todos, saved]);
//         setTask("");
//         setShowForm(false);
//       }
//     }
//   };

//   const handleDelete = async (id: string) => {
//     await fetch(`http://localhost:8005/api/todos/${id}`, { method: "DELETE" });
//     setTodos(todos.filter((item) => item._id !== id));
//   };

//   const handleCheckbox = async (id: string) => {
//     const todo = todos.find((t) => t._id === id);
//     if (!todo) return;

//     const updated = { ...todo, isCompleted: !todo.isCompleted };
//     await fetch(`http://localhost:8005/api/todos/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ isCompleted: updated.isCompleted }),
//     });
//     setTodos(todos.map((t) => (t._id === id ? updated : t)));
//   };

//   // const filteredTodos = todos.filter((t) => {
//   //   const today = new Date().toDateString();
//   //   const taskDate = new Date(t.createdAt).toDateString();
//   //   if (filter === "today") return taskDate === today;
//   //   if (filter === "pending") return !t.isCompleted;
//   //   if (filter === "overdue") return !t.isCompleted && taskDate < today;
//   //   return true;
//   // });
//   const filteredTodos = Array.isArray(todos)
//   ? todos.filter((t) => {
//       const today = new Date().toDateString();
//       const taskDate = new Date(t.createdAt).toDateString();
//       if (filter === "today") return taskDate === today;
//       if (filter === "pending") return !t.isCompleted;
//       if (filter === "overdue") return !t.isCompleted && taskDate < today;
//       return true;
//     })
//   : [];

//   return (
//     <div className="min-h-screen bg-gray-100">
      
//       <div className="container mx-auto p-5 max-w-lg">
//         <h1 className="text-3xl font-bold mb-5 text-center">Todo App</h1>

//         {/* Filter Buttons */}
//         <div className="flex gap-2 justify-center mb-5">
//           {["today", "pending", "overdue"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f as any)}
//               className={`px-4 py-2 rounded ${
//                 filter === f ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
//               }`}
//             >
//               {f.charAt(0).toUpperCase() + f.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Todo Input Form */}
//         {showForm && (
//           <div className="flex gap-2 mb-5">
//             <input
//               type="text"
//               placeholder="Enter your task..."
//               value={task}
//               onChange={(e) => setTask(e.target.value)}
//               className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <button
//               onClick={handleAdd}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               {editId ? "Update" : "Add"}
//             </button>
//           </div>
//         )}

//         {/* Todo List */}
//         <div className="space-y-3">
//           <AnimatePresence>
//             {filteredTodos.map((todo) => (
//               <motion.div
//                 key={todo._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className={`flex justify-between items-center p-4 border rounded shadow ${
//                   todo.isCompleted ? "bg-gray-200 line-through text-gray-500" : "bg-white"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     checked={todo.isCompleted}
//                     onChange={() => handleCheckbox(todo._id!)}
//                     className="w-5 h-5"
//                   />
//                   <div>
//                     <span>{todo.task}</span>
//                     <div className="text-xs text-gray-400">{new Date(todo.createdAt).toDateString()}</div>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleDelete(todo._id!)}
//                     className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* Completed Section */}
//         <h2 className="mt-6 font-semibold">Completed</h2>
//         <div className="space-y-2">
//           {todos.filter((t) => t.isCompleted).map((todo) => (
//             <div key={todo._id} className="flex justify-between items-center p-3 bg-gray-200 rounded">
//               <span className="line-through text-gray-500">{todo.task}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TodoApp;















































// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type Todo = {
//   _id?: string;
//   task: string;
//   isCompleted: boolean;
//   createdAt: string;
// };

// const TodoApp = () => {
//   const [task, setTask] = useState<string>("");
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [filter, setFilter] = useState<"today" | "pending" | "overdue">("today");

//   // ✅ Fetch Todos
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     fetch("http://localhost:8005/api/todos", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setTodos(data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ✅ Add / Update Todo
//   const handleAdd = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     const trimmed = task.trim();
//     if (!trimmed) return;

//     if (editId) {
//       // Update
//       await fetch(`http://localhost:8005/api/todos/${editId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ task: trimmed }),
//       });

//       setTodos(todos.map((t) => (t._id === editId ? { ...t, task: trimmed } : t)));
//       setEditId(null);
//       setTask("");
//     } else {
//       // Add new
//       const newTodo = {
//         task: trimmed,
//         isCompleted: false,
//         createdAt: new Date().toISOString(),
//       };

//       const res = await fetch("http://localhost:8005/api/todos", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newTodo),
//       });

//       if (res.ok) {
//         const saved = await res.json();
//         setTodos([...todos, saved]);
//         setTask("");
//       }
//     }
//   };

//   // ✅ Delete Todo
//   const handleDelete = async (id: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     await fetch(`http://localhost:8005/api/todos/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setTodos(todos.filter((t) => t._id !== id));
//   };

//   // ✅ Toggle Checkbox
//   const handleCheckbox = async (id: string) => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const todo = todos.find((t) => t._id === id);
//     if (!todo) return;

//     const updated = { ...todo, isCompleted: !todo.isCompleted };

//     await fetch(`http://localhost:8005/api/todos/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ isCompleted: updated.isCompleted }),
//     });

//     setTodos(todos.map((t) => (t._id === id ? updated : t)));
//   };

//   // ✅ Filters fix
//   const filteredTodos = Array.isArray(todos)
//     ? todos.filter((t) => {
//         const today = new Date();
//         const taskDate = new Date(t.createdAt);

//         if (filter === "today") {
//           return taskDate.toDateString() === today.toDateString();
//         }
//         if (filter === "pending") return !t.isCompleted;
//         if (filter === "overdue") {
//           return !t.isCompleted && taskDate < today;
//         }
//         return true;
//       })
//     : [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] pt-28 px-4">
//       <div className="container mx-auto p-6 max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
//         <h1 className="text-4xl font-extrabold mb-6 text-center text-yellow-400 drop-shadow-lg">
//           🚀 iTask - Manage Your Day
//         </h1>

//         {/* Filter Buttons */}
//         <div className="flex gap-3 justify-center mb-6">
//           {["today", "pending", "overdue"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f as any)}
//               className={`px-6 py-2 rounded-full font-semibold transition-all ${
//                 filter === f
//                   ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg scale-105"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {f.charAt(0).toUpperCase() + f.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Input Form */}
//         <div className="flex gap-2 mb-6">
//           <input
//             type="text"
//             placeholder="✍️ Add a task..."
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition-all shadow-md"
//           >
//             {editId ? "Update" : "Add"}
//           </button>
//         </div>

//         {/* Todo List */}
//         <div className="space-y-3">
//           <AnimatePresence>
//             {filteredTodos.map((todo) => (
//               <motion.div
//                 key={todo._id}
//                 initial={{ opacity: 0, y: 25 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -25 }}
//                 whileHover={{ scale: 1.03 }}
//                 className={`flex justify-between items-center p-4 rounded-xl shadow-md ${
//                   todo.isCompleted
//                     ? "bg-green-100 line-through text-gray-500"
//                     : "bg-white/80"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     checked={todo.isCompleted}
//                     onChange={() => handleCheckbox(todo._id!)}
//                     className="w-5 h-5 accent-green-500"
//                   />
//                   <div>
//                     <span className="font-semibold">{todo.task}</span>
//                     <div className="text-xs text-gray-400">
//                       {new Date(todo.createdAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(todo._id!)}
//                   className="px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoApp;














































import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Todo = {
  _id?: string;
  task: string;
  isCompleted: boolean;
  createdAt: string;
};

const TodoApp = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"today" | "pending" | "overdue">("today");

  // ✅ Fetch Todos
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8005/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Add / Update Todo
  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const trimmed = task.trim();
    if (!trimmed) return;

    if (editId) {
      // Update
      await fetch(`http://localhost:8005/api/todos/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: trimmed }),
      });

      setTodos(todos.map((t) => (t._id === editId ? { ...t, task: trimmed } : t)));
      setEditId(null);
      setTask("");
    } else {
      // Add new
      const newTodo = {
        task: trimmed,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:8005/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (res.ok) {
        const saved = await res.json();
        setTodos([...todos, saved]);
        setTask("");
      }
    }
  };

  // ✅ Delete Todo
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`http://localhost:8005/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setTodos(todos.filter((t) => t._id !== id));
  };

  // ✅ Toggle Checkbox
  const handleCheckbox = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const todo = todos.find((t) => t._id === id);
    if (!todo) return;

    const updated = { ...todo, isCompleted: !todo.isCompleted };

    await fetch(`http://localhost:8005/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isCompleted: updated.isCompleted }),
    });

    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  // ✅ Filters fix
  const filteredTodos = Array.isArray(todos)
    ? todos.filter((t) => {
        const today = new Date();
        const taskDate = new Date(t.createdAt);

        if (filter === "today") {
          return taskDate.toDateString() === today.toDateString();
        }
        if (filter === "pending") return !t.isCompleted;
        if (filter === "overdue") {
          return !t.isCompleted && taskDate < today;
        }
        return true;
      })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] pt-28 px-4">
      <div className="container mx-auto p-6 max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-yellow-400 drop-shadow-lg">
          🚀 iTask - Manage Your Day
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mb-6">
          {["today", "pending", "overdue"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="✍️ Add a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition-all shadow-md"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.div
                key={todo._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                whileHover={{ scale: 1.03 }}
                className={`flex justify-between items-center p-4 rounded-xl shadow-md ${
                  todo.isCompleted
                    ? "bg-green-100 line-through text-gray-500"
                    : "bg-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleCheckbox(todo._id!)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <div>
                    <span className="font-semibold">{todo.task}</span>
                    <div className="text-xs text-gray-400">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(todo._id!)}
                  className="px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

