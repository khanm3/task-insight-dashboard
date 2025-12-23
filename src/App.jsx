import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data = await res.json()
      setTasks(data)
      setLoading(false)
    }

    fetchTasks()
  }, [])

  return (
    <>
      <h1>Task Insight Dashboard</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <TaskList
          tasks={tasks}
          selectedTaskId={selectedTaskId}
          onSelectTask={setSelectedTaskId}
        />
      )}
    </>
  )
}

export default App
