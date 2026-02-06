import StatusBadge from "./StatusBadge"

function TaskCard({ task, isSelected, onSelect }) {
  return (
    <li
      className={`
        flex flex-col
        px-4 py-4
        border rounded-lg
        transition-colors transition-shadow duration-200
        cursor-pointer

        ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:bg-gray-50 hover:shadow-md"
        }
      `}
      onClick={() => onSelect(task.id)}
    >
      <h3 className="text-lg font-medium text-gray-900">
        {task.title}
      </h3>

      <div className="text-gray-600">
        Status: <StatusBadge status={task.completed ? "completed" : "incomplete"} />
      </div>

    </li>
  )
}

export default TaskCard
