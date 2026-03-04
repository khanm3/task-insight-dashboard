import { Task } from "../types"
import TaskCard from "./TaskCard"

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  editingTaskId: string | null
  setEditingTaskId: (id: string | null) => void
  onSave: (id: string, newTitle: string) => void
  onCancel: () => void
  onDelete: (id: string) => void
}

function TaskList({
  tasks,
  onToggle,
  editingTaskId,
  setEditingTaskId,
  onSave,
  onCancel,
  onDelete
}: TaskListProps) {
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
