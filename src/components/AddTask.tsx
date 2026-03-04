import React, { useState } from "react"

interface AddTaskProps {
  onAdd: (title: string) => void
}

function AddTask({ onAdd }: AddTaskProps) {
  const [ newTaskTitle, setNewTaskTitle ] = useState("")

  // Event handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = newTaskTitle.trim()
      if (!trimmed) return

      onAdd(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  return (
    <input
      type="text"
      placeholder="Add new task"
      value={newTaskTitle}
      onChange={(e) => setNewTaskTitle(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

export default AddTask
