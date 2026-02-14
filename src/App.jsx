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

  useEffect(() => {
    setSelectedTaskId(null)
  }, [filter])

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "incomplete") return !task.completed
    return true
  })

  const numCompleted = tasks.filter(task => task.completed).length

  return (
    <div className="mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 py-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-medium text-gray-900">
          Task Insight Dashboard
        </h1>
        <p className="text-sm text-gray-600 font-normal">
          {numCompleted} of {tasks.length} tasks completed
        </p>

        {loading ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            Loading tasks...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <TaskFilter
              filter={filter}
              onChange={setFilter}
            />
            <TaskList
              tasks={filteredTasks}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default App
