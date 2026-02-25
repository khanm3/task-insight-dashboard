import { useState } from "react"

function TaskCard({ task, onToggle, isEditing, onStartEditing, onSave, onCancel, onDelete }) {
  const [draftTitle, setDraftTitle] = useState(task.title)

  // Derived values
  const titleId = `task-title-${task.id}`

  // Event handlers
  const handleDiscard = () => {
    setDraftTitle(task.title)
    onCancel()
  }

  const handleSave = () => {
    if (draftTitle.trim() === "") {
      handleDiscard()
    } else {
      onSave(task.id, draftTitle)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave()
    }
    if (e.key === "Escape") {
      handleDiscard()
    }
  }

  const handleBlur = () => {
    if (isEditing) {
      handleSave()
    }
  }

  return (
    <li
      aria-labelledby={titleId}
      className={`
        flex flex-col
        px-4 py-4
        border rounded-lg
        transition-colors transition-shadow duration-200
        border-gray-200 hover:bg-gray-50
      `}
    >

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "completed"}`}
          className="accent-blue-600 h-5 w-5 mt-1 cursor-pointer border-gray-300 focus:ring-blue-500"
        />

        {isEditing ? (
          <input
            type="text"
            aria-label="Edit task title"
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`
              flex-1
              text-lg
              font-medium
              leading-tight
              bg-transparent
              border-b border-gray-300
              focus:outline-none focus:border-blue-500 focus:bg-blue-50
              transition-colors duration-150 ease-in-out
              ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }
            `}
          />
        ) : (
          <h3
            id={titleId}
            className={`
              flex-1 text-lg font-medium leading-tight transition-colors cursor-text
              ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-900"
              }`
            }
            onClick={onStartEditing}
          >
            {task.title}
          </h3>
        )}

        {/* Delete Button */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
          aria-label={`Delete task ${task.title}`}
          className="ml-2 p-1 rounded hover:bg-gray-100 hover:text-red-500 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default TaskCard
