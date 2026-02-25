import TaskCard from "./TaskCard"

function TaskList({ tasks, onToggle, editingTaskId, setEditingTaskId, onSave, onCancel }) {
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
        />
      ))}
    </ul>
  )
}

export default TaskList
