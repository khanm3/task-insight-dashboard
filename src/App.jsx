import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
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
        <ul>
          <li>Placeholder list</li>
          <li>There are {tasks.length} tasks to do</li>
        </ul>
      )}
    </>
  )
}

export default App
