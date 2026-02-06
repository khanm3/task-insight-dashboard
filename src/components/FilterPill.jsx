function FilterPill({ active, label, onClick }) {
  const baseClasses =
    "rounded-full px-3 py-1 text-sm shadow-sm transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
  const activeClasses =
   active
    ? "bg-blue-600 text-white hover:bg-blue-700 focus-visible:bg-blue-700"
    : "border border-gray-300 text-gray-700 hover:bg-gray-100 focus-visible:bg-gray-100"
  return (
    <button
      role="radio"
      aria-checked={active}
      aria-pressed={active}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
    >
      {label}
    </button>
  )
}

export default FilterPill
