import TaskCard from "./TaskCard"

function TaskList({ tasks, onToggle, editingTaskId, setEditingTaskId }) {
  return (
    <ul
      className="flex flex-col gap-4"
    >
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          isEditing={editingTaskId === task.id}
          onStartEditing={() => setEditingTaskId(task.id)}
        />
      ))}
    </ul>
  )
}

export default TaskList
