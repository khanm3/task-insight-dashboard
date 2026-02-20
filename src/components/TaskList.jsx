import TaskCard from "./TaskCard"

function TaskList({ tasks, onToggle }) {
  return (
    <ul
      role="listbox"
      className="flex flex-col gap-4"
    >
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

export default TaskList
