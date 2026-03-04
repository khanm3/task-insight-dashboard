import { Filter } from "../types";
import FilterPill from "./FilterPill";

interface TaskFilterProps {
  filter: Filter
  onChange: (filter: Filter) => void
}

function TaskFilter({ filter, onChange }: TaskFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <FilterPill
        active={filter === "all"}
        label="All"
        onClick={() => onChange("all")}
      />
      <FilterPill
        active={filter === "completed"}
        label="Completed"
        onClick={() => onChange("completed")}
      />
      <FilterPill
        active={filter === "incomplete"}
        label="Incomplete"
        onClick={() => onChange("incomplete")}
      />
    </div>
  )
}

export default TaskFilter;
