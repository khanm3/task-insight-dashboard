import TaskCard from "./TaskCard"

function TaskList({ tasks, selectedTaskId, onSelectTask }) {
  return (
    <ul
      role="listbox"
      className="flex flex-col gap-4"
    >
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          isSelected={selectedTaskId === task.id}
          onSelect={onSelectTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
