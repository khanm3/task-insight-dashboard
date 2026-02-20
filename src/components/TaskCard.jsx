function TaskCard({ task, onToggle }) {
  const titleId = `task-title-${task.id}`

  return (
    <li
      aria-labelledby={titleId}
      className={`
        flex flex-col
        px-4 py-4
        border rounded-lg
        transition-colors transition-shadow duration-200
        "border-gray-200 hover:bg-gray-50 hover:shadow-md"
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

        <h3
          id={titleId}
          className={`text-lg font-medium transition-colors ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
      </div>
    </li>
  )
}

export default TaskCard
