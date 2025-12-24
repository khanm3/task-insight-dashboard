import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './TaskList'
import TaskFilter from './TaskFilter'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await res.json()
      setTasks(data)
      setLoading(false)
    }

    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "incomplete") return !task.completed
    return true
  })

  return (
    <>
      <h1>Task Insight Dashboard</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div>
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
    </>
  )
}

export default App
