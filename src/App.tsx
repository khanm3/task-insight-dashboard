import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import AddTask from './components/AddTask'
import { ApiTask, Filter, Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>(() => {
    const persistedFilter = localStorage.getItem("filter")
    if (
      persistedFilter === "all" ||
      persistedFilter === "completed" ||
      persistedFilter === "incomplete"
    ) {
      return persistedFilter;
    }
    return "all"
  })
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const data: ApiTask[] = await res.json()

      // JSONPlaceholder returns numeric ids — convert to string
      const formattedTasks: Task[] = data.map(item => ({
        id: String(item.id),
        title: item.title,
        completed: item.completed
      }))

      setTasks(formattedTasks)
      setLoading(false)
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    const persistedFilter = localStorage.getItem("filter")
    if (
      persistedFilter === "all" ||
      persistedFilter === "completed" ||
      persistedFilter === "incomplete"
    ) {
      setFilter(persistedFilter)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("filter", filter)
  }, [filter])

  // Derived values
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed
    if (filter === "incomplete") return !task.completed
    return true
  })

  const numCompleted = tasks.filter(task => task.completed).length

  // Event handlers
  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, title: newTitle }
          : task
      )
    )
    setEditingTaskId(null)
  }

  const cancelEditing = () => {
    setEditingTaskId(null)
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.filter((task) => task.id !== id)
    )
  }

  const addTask = (title: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    }
    setTasks(prevTasks => [ newTask, ...prevTasks ])
  }

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

            <AddTask onAdd={addTask} />

            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              editingTaskId={editingTaskId}
              setEditingTaskId={setEditingTaskId}
              onSave={updateTaskTitle}
              onCancel={cancelEditing}
              onDelete={deleteTask}
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default App
