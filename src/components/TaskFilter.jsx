import FilterPill from "./FilterPill";

function TaskFilter({ filter, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <FilterPill
        active={true}
        label="All"
      />
      <FilterPill
        active={false}
        label="Completed"
      />
      <FilterPill
        active={false}
        label="Incomplete"
      />
    </div>
  )
}

export default TaskFilter;
