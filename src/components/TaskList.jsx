import TaskCard from "./TaskCard"

function TaskList({ tasks, onToggle, editingTaskId, setEditingTaskId, onSave, onCancel, onDelete }) {
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
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
