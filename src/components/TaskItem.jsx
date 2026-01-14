function TaskItem({ task, isSelected, onSelect }) {
  return (
    <li
      onClick={() => onSelect(task.id)}
      style={{ fontWeight: isSelected ? "bold" : "normal" }}
    >
      {task.title}
    </li>
  )
}

export default TaskItem
