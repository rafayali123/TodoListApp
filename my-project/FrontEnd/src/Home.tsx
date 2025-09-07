"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaCalendarDay,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa"

type Todo = {
  _id?: string
  task: string
  isCompleted: boolean
  createdAt: string
}

const TodoApp = () => {
  const [task, setTask] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [editId, setEditId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"today" | "pending" | "overdue">("today")
  const [isLoading, setIsLoading] = useState(false)

  // Fetch Todos
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch("http://localhost:8005/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err))
  }, [])

  // Add / Update Todo
  const handleAdd = async () => {
    const token = localStorage.getItem("token")
    if (!token) return
    const trimmed = task.trim()
    if (!trimmed) return

    setIsLoading(true)

    if (editId) {
      // Update
      await fetch(`http://localhost:8005/api/todos/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task: trimmed }),
      })

      setTodos(todos.map((t) => (t._id === editId ? { ...t, task: trimmed } : t)))
      setEditId(null)
      setTask("")
    } else {
      // Add new
      const newTodo = {
        task: trimmed,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      }

      const res = await fetch("http://localhost:8005/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      })

      if (res.ok) {
        const saved = await res.json()
        setTodos([...todos, saved])
        setTask("")
      }
    }
    setIsLoading(false)
  }

  // Delete Todo
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    await fetch(`http://localhost:8005/api/todos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    setTodos(todos.filter((t) => t._id !== id))
  }

  // Toggle Checkbox
  const handleCheckbox = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    const todo = todos.find((t) => t._id === id)
    if (!todo) return

    const updated = { ...todo, isCompleted: !todo.isCompleted }

    await fetch(`http://localhost:8005/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isCompleted: updated.isCompleted }),
    })

    setTodos(todos.map((t) => (t._id === id ? updated : t)))
  }

  const handleEdit = (todo: Todo) => {
    setEditId(todo._id!)
    setTask(todo.task)
  }

  const cancelEdit = () => {
    setEditId(null)
    setTask("")
  }

  // Filters
  const filteredTodos = Array.isArray(todos)
    ? todos.filter((t) => {
        const today = new Date()
        const taskDate = new Date(t.createdAt)

        if (filter === "today") {
          return taskDate.toDateString() === today.toDateString()
        }
        if (filter === "pending") return !t.isCompleted
        if (filter === "overdue") {
          return !t.isCompleted && taskDate < today
        }
        return true
      })
    : []

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.isCompleted).length,
    pending: todos.filter((t) => !t.isCompleted).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20 sm:pt-24 px-3 sm:px-4 pb-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-lg sm:text-2xl font-bold text-slate-900">✓</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                iTask
              </h1>
              <p className="text-slate-300 text-sm sm:text-lg">Organize your day, achieve your goals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-white/20">
              <div className="text-xl sm:text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-slate-300 text-xs sm:text-sm">Total</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-green-500/30">
              <div className="text-xl sm:text-2xl font-bold text-green-300">{stats.completed}</div>
              <div className="text-green-200 text-xs sm:text-sm">Done</div>
            </div>
            <div className="bg-amber-500/20 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-amber-500/30">
              <div className="text-xl sm:text-2xl font-bold text-amber-300">{stats.pending}</div>
              <div className="text-amber-200 text-xs sm:text-sm">Pending</div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
            {[
              { key: "today", label: "Today", icon: FaCalendarDay },
              { key: "pending", label: "Pending", icon: FaClock },
              { key: "overdue", label: "Overdue", icon: FaExclamationTriangle },
            ].map(({ key, label, icon: Icon }) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(key as any)}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 w-full sm:w-auto ${
                  filter === key
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg"
                    : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20"
                }`}
              >
                <Icon className="text-xs sm:text-sm" />
                {label}
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={editId ? "✏️ Update task..." : "✨ What needs to be done?"}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-lg"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                disabled={isLoading || !task.trim()}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base flex-1 sm:flex-none justify-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                ) : editId ? (
                  <FaCheck />
                ) : (
                  <FaPlus />
                )}
                <span className="hidden sm:inline">{editId ? "Update" : "Add"}</span>
              </motion.button>
              {editId && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelEdit}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <FaTimes />
                </motion.button>
              )}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📝</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-300 mb-2">No tasks found</h3>
                  <p className="text-sm sm:text-base text-slate-400">Add a new task to get started!</p>
                </motion.div>
              ) : (
                filteredTodos.map((todo, index) => (
                  <motion.div
                    key={todo._id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 ${
                      todo.isCompleted
                        ? "bg-green-500/20 border border-green-500/30 backdrop-blur-sm"
                        : "bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15"
                    }`}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCheckbox(todo._id!)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                        todo.isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-slate-400 hover:border-amber-400"
                      }`}
                    >
                      {todo.isCompleted && <FaCheck className="text-xs" />}
                    </motion.button>

                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-semibold text-sm sm:text-lg transition-all duration-300 break-words ${
                          todo.isCompleted ? "line-through text-slate-400" : "text-white"
                        }`}
                      >
                        {todo.task}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 mt-1">
                        {new Date(todo.createdAt).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    <div className="flex gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                      {!todo.isCompleted && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(todo)}
                          className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                        >
                          <FaEdit className="text-xs sm:text-sm" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(todo._id!)}
                        className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors border border-red-500/30"
                      >
                        <FaTrash className="text-xs sm:text-sm" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoApp
