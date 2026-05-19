export default function EmptyState({ emoji = '📭', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="font-display text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      {description && <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">{description}</p>}
      {action}
    </div>
  )
}
