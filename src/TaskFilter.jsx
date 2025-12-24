function TaskFilter({ filter, onChange }) {
  return (
    <>
      <button onClick={() => onChange("all")}>All</button>
      <button onClick={() => onChange("completed")}>Completed</button>
      <button onClick={() => onChange("incomplete")}>Incomplete</button>

    </>
  )
}

export default TaskFilter;
