import TaskItem from "./TaskItem"

function TaskList({ tasks, selectedTaskId, onSelectTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          task={task}
          isSelected={selectedTaskId === task.id}
          onSelect={onSelectTask}
        />
      ))}
    </ul>
  )
}

export default TaskList
