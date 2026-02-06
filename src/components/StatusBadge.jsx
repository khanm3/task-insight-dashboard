function StatusBadge({ status }) {
  const baseClasses =
    'inline-block rounded-full px-2 py-0.5 text-xs font-medium';
  const statusClasses =
    status === 'completed'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  const label =
    status === 'completed' ? 'Completed' : 'Incomplete';
  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {label}
    </span>
  )
}

export default StatusBadge
