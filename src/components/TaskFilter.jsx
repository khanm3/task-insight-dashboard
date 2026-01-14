function TaskFilter({ filter, onChange }) {
  return (
    <>
      <button
        onClick={() => onChange("all")}
        aria-pressed={filter === "all"}
      >
        All
      </button>

      <button
        onClick={() => onChange("completed")}
        aria-pressed={filter === "completed"}
      >
        Completed
      </button>

      <button
        onClick={() => onChange("incomplete")}
        aria-pressed={filter === "incomplete"}
      >
        Incomplete
      </button>

    </>
  )
}

export default TaskFilter;
