import TaskItem from "./TaskItem"

function TaskList({ tasks, selectedTaskId, onSelectTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
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
