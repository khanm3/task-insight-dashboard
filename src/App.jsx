import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(() => {
    const persistedFilter = localStorage.getItem("filter")
    if (persistedFilter) {
      return persistedFilter;
    }
    return "all"
  })

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await res.json()
      setTasks(data)
      setLoading(false)
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    const persistedFilter = localStorage.getItem("filter")
    if (persistedFilter) {
      setFilter(persistedFilter)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("filter", filter)
  }, [filter])

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "incomplete") return !task.completed
    return true
  })

  const dummyTasks = [
    { id: 1, title: "Write README", completed: true },
    { id: 2, title: "Refactor layout", completed: false },
    { id: 3, title: "Polish filters", completed: true },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-purple-600">
          Task Insight Dashboard
        </h1>

        <TaskFilter />

        <TaskList tasks={dummyTasks} />
      </div>
    </div>
  )
}

export default App
